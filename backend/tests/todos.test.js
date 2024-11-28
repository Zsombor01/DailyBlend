const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Todo = require('../model/Todo');
const User = require('../model/User');

let mongoServer;

// Mock user for authentication
const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Test User',
    email: 'test@test.com',
    password: 'password123',
    date: new Date()
};

// Mock authenticated request
const mockAuthenticatedUser = (req, res, next) => {
    req.user = mockUser;
    next();
};

// Mock the auth middleware
jest.mock('../config/auth', () => ({
    ensureAuthenticated: (req, res, next) => mockAuthenticatedUser(req, res, next)
}));

beforeAll(async () => {
    // Set up MongoDB Memory Server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear the database before each test
    await Todo.deleteMany({});
});

describe('Todo Routes', () => {
    describe('GET /', () => {
        it('should get all todos for the current user', async () => {
            // Create test todos
            await Todo.create([
                { text: 'Test todo 1', user: mockUser._id },
                { text: 'Test todo 2', user: mockUser._id },
                { text: 'Other user todo', user: new mongoose.Types.ObjectId() }
            ]);

            const response = await request(app)
                .get('/todos')
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body[0].text).toBe('Test todo 1');
            expect(response.body[1].text).toBe('Test todo 2');
        });
    });

    describe('POST /', () => {
        it('should create a new todo', async () => {
            const todoData = { text: 'New todo' };

            const response = await request(app)
                .post('/todos')
                .send(todoData)
                .expect(201);

            expect(response.body.text).toBe(todoData.text);
            expect(response.body.done).toBe(false);
            expect(response.body.user.toString()).toBe(mockUser._id.toString());

            // Verify it's in the database
            const todo = await Todo.findById(response.body._id);
            expect(todo).toBeTruthy();
            expect(todo.text).toBe(todoData.text);
        });

        it('should return 400 if text is missing', async () => {
            await request(app)
                .post('/todos')
                .send({})
                .expect(400);
        });
    });

    describe('PATCH /:id', () => {
        it('should toggle todo status', async () => {
            const todo = await Todo.create({
                text: 'Test todo',
                user: mockUser._id,
                done: false
            });

            const response = await request(app)
                .patch(`/todos/${todo._id}`)
                .expect(200);

            expect(response.body.done).toBe(true);

            // Verify in database
            const updatedTodo = await Todo.findById(todo._id);
            expect(updatedTodo.done).toBe(true);
        });

        it('should return 404 if todo not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            await request(app)
                .patch(`/todos/${fakeId}`)
                .expect(404);
        });

        it('should return 404 if todo belongs to different user', async () => {
            const otherUser = new mongoose.Types.ObjectId();
            const todo = await Todo.create({
                text: 'Other user todo',
                user: otherUser,
                done: false
            });

            await request(app)
                .patch(`/todos/${todo._id}`)
                .expect(404);
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a todo', async () => {
            const todo = await Todo.create({
                text: 'Test todo',
                user: mockUser._id
            });

            await request(app)
                .delete(`/todos/${todo._id}`)
                .expect(200);

            // Verify it's deleted from database
            const deletedTodo = await Todo.findById(todo._id);
            expect(deletedTodo).toBeNull();
        });

        it('should return 404 if todo not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            await request(app)
                .delete(`/todos/${fakeId}`)
                .expect(404);
        });

        it('should return 404 if todo belongs to different user', async () => {
            const otherUser = new mongoose.Types.ObjectId();
            const todo = await Todo.create({
                text: 'Other user todo',
                user: otherUser
            });

            await request(app)
                .delete(`/todos/${todo._id}`)
                .expect(404);
        });
    });
});
