const request = require('supertest');
const express = require('express');
const axios = require('axios');
const router = require('../routes/movies');

// Mock axios
jest.mock('axios');
const app = express();
app.use(express.json());
app.use(router);

// Mock User and Movies models
jest.mock('../model/User', () => ({
    findOne: jest.fn(),
}));
jest.mock('../model/Movies', () => ({
    exists: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn(),
}));

const User = require('../model/User');
const Movies = require('../model/Movies');

describe('Movies API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Mock console.error to avoid cluttering test output
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        console.error.mockRestore();
    });

    describe('PUT /updateUserData/:userName/:listType/:movieID', () => {
        it('should add a movie to the user list if not already present', async () => {
            User.findOne.mockResolvedValueOnce({ userID: 'userId123' });
            Movies.exists.mockResolvedValueOnce(false);
            Movies.findOneAndUpdate.mockResolvedValueOnce();

            const response = await request(app)
                .put('/updateUserData/testUser/favorites/12345');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                movieID: '12345',
                userName: 'testUser',
                listName: 'favorites',
                action: 'added',
            });
        });

        it('should remove a movie from the user list if already present', async () => {
            User.findOne.mockResolvedValueOnce({ userID: 'userId123' });
            Movies.exists.mockResolvedValueOnce(true);
            Movies.findOneAndUpdate.mockResolvedValueOnce();

            const response = await request(app)
                .put('/updateUserData/testUser/favorites/12345');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                movieID: '12345',
                userName: 'testUser',
                listName: 'favorites',
                action: 'removed',
            });
        });

        it('should return 404 if user is not found', async () => {
            User.findOne.mockResolvedValueOnce(null);

            const response = await request(app)
                .put('/updateUserData/testUser/favorites/12345');

            expect(response.status).toBe(404);
            expect(response.text).toBe('User not found');
        });

        it('should return 500 for internal server error', async () => {
            User.findOne.mockRejectedValueOnce(new Error('Database Error'));

            const response = await request(app)
                .put('/updateUserData/testUser/favorites/12345');

            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal Server Error');
        });
    });

    describe('GET /userData/:userName', () => {
        it('should return user movie data', async () => {
            User.findOne.mockResolvedValueOnce({ userID: 'userId123' });
            Movies.findOne.mockResolvedValueOnce({ favorites: ['12345'] });

            const response = await request(app).get('/userData/testUser');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                movieListData: { favorites: ['12345'] },
            });
        });

        it('should return 404 if user is not found', async () => {
            User.findOne.mockResolvedValueOnce(null);

            const response = await request(app).get('/userData/testUser');

            expect(response.status).toBe(404);
            expect(response.text).toBe('User not found');
        });

        it('should return 404 if movies data is not found', async () => {
            User.findOne.mockResolvedValueOnce({ userID: 'userId123' });
            Movies.findOne.mockResolvedValueOnce(null);

            const response = await request(app).get('/userData/testUser');

            expect(response.status).toBe(404);
            expect(response.text).toBe('Movies not found');
        });
    });

    describe('GET /', () => {
        it('should return movie data for a valid movie ID', async () => {
            axios.get.mockResolvedValueOnce({ data: { id: 12345, title: 'Test Movie' } });

            const response = await request(app).get('/?movieID=12345');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 12345, title: 'Test Movie' });
        });

        it('should return 400 if movie ID is not provided', async () => {
            const response = await request(app).get('/');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Movie ID is required' });
        });

        it('should return 500 for external API failure', async () => {
            axios.get.mockRejectedValueOnce(new Error('API Error'));

            const response = await request(app).get('/?movieID=12345');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to fetch movie data' });
        });
    });

    describe('GET /trending', () => {
        it('should return trending movie data', async () => {
            axios.get.mockResolvedValueOnce({ data: { results: [{ id: 1, title: 'Trending Movie' }] } });

            const response = await request(app).get('/trending');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ results: [{ id: 1, title: 'Trending Movie' }] });
        });

        it('should return 500 for external API failure', async () => {
            axios.get.mockRejectedValueOnce(new Error('API Error'));

            const response = await request(app).get('/trending');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to fetch trending movie data' });
        });
    });

    describe('GET /discover', () => {
        it('should return discovered movie data', async () => {
            axios.get.mockResolvedValueOnce({ data: { results: [{ id: 1, title: 'Discovered Movie' }] } });

            const response = await request(app).get('/discover');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ results: [{ id: 1, title: 'Discovered Movie' }] });
        });

        it('should return 500 for external API failure', async () => {
            axios.get.mockRejectedValueOnce(new Error('API Error'));

            const response = await request(app).get('/discover');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Failed to fetch discover movie data' });
        });
    });
});
