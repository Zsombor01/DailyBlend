const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Todo = require("../model/Todo");
const todosRouter = require("../routes/todos");

// Mock user data
const mockUser = {
    id: new mongoose.Types.ObjectId(),
    email: "testuser@example.com",
    name: "Test User",
};

// Mock authentication middleware
jest.mock("../config/auth", () => ({
    ensureAuthenticated: (req, res, next) => {
        req.user = mockUser;
        next();
    },
}));

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use("/todos", todosRouter);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Todo.deleteMany({});
});

describe("Todos API", () => {
    let todo1, todo2, otherUserTodo;

    beforeEach(async () => {
        // Create test data before each test
        todo1 = await Todo.create({ text: "Todo 1", user: mockUser.id });
        todo2 = await Todo.create({ text: "Todo 2", user: mockUser.id });
        otherUserTodo = await Todo.create({
            text: "Other user's todo",
            user: new mongoose.Types.ObjectId(),
        });
    });

    describe("GET /todos", () => {
        it("should return all todos for the authenticated user", async () => {
            const response = await request(app).get("/todos");

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);

            const todoTexts = response.body.map((todo) => todo.text);
            expect(todoTexts).toContain("Todo 1");
            expect(todoTexts).toContain("Todo 2");
        });
    });

    describe("POST /todos", () => {
        it("should create a new todo for the authenticated user", async () => {
            const newTodoText = "New Todo";
            const response = await request(app).post("/todos").send({ text: newTodoText });

            expect(response.status).toBe(201);
            expect(response.body.text).toBe(newTodoText);
            expect(response.body.done).toBe(false);
            expect(response.body.user).toBe(mockUser.id.toString());

            const todoInDB = await Todo.findById(response.body._id);
            expect(todoInDB).not.toBeNull();
            expect(todoInDB.text).toBe(newTodoText);
        });

        it("should return 400 if text is missing", async () => {
            const response = await request(app).post("/todos").send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBeDefined();
        });
    });

    describe("PATCH /todos/:id", () => {
        it("should toggle the done status of a todo", async () => {
            const response = await request(app).patch(`/todos/${todo1._id}`);

            expect(response.status).toBe(200);
            expect(response.body.done).toBe(true);

            const updatedTodo = await Todo.findById(todo1._id);
            expect(updatedTodo.done).toBe(true);
        });

        it("should return 404 if the todo is not found", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).patch(`/todos/${fakeId}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Todo not found");
        });

        it("should return 404 if the todo does not belong to the user", async () => {
            const response = await request(app).patch(`/todos/${otherUserTodo._id}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Todo not found");
        });
    });

    describe("DELETE /todos/:id", () => {
        it("should delete a todo owned by the authenticated user", async () => {
            const response = await request(app).delete(`/todos/${todo1._id}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Todo deleted");

            const todoInDB = await Todo.findById(todo1._id);
            expect(todoInDB).toBeNull();
        });

        it("should return 404 if the todo is not found", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const response = await request(app).delete(`/todos/${fakeId}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Todo not found");
        });

        it("should return 404 if the todo does not belong to the user", async () => {
            const response = await request(app).delete(`/todos/${otherUserTodo._id}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Todo not found");
        });
    });
});
