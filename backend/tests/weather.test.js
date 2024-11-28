const request = require('supertest');
const express = require('express');
const weatherRouter = require('../routes/weather');
const axios = require('axios');

// Mock Axios
jest.mock('axios');

const app = express();
app.use(express.json());
app.use('/weather', weatherRouter);

describe('Weather API', () => {
    const mockWeatherData = {
        main: { temp: 22.5 },
        weather: [{ description: 'clear sky' }],
        name: 'Test City'
    };

    const mockForecastData = {
        list: [
            { dt_txt: '2024-11-28 12:00:00', main: { temp: 20.0 }, weather: [{ description: 'light rain' }] },
            { dt_txt: '2024-11-28 15:00:00', main: { temp: 18.5 }, weather: [{ description: 'cloudy' }] }
        ]
    };

    describe('GET /weather/current', () => {
        it('should return current weather for a valid location', async () => {
            axios.get.mockResolvedValueOnce({ data: mockWeatherData });

            const response = await request(app).get('/weather/current?location=TestCity');
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Test City');
            expect(response.body.main.temp).toBe(22.5);
        });

        it('should return 400 if location is not provided', async () => {
            const response = await request(app).get('/weather/current');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Location is required');
        });

        it('should return 500 if OpenWeather API fails', async () => {
            axios.get.mockRejectedValueOnce(new Error('API Error'));

            const response = await request(app).get('/weather/current?location=TestCity');
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Failed to fetch weather data');
        });
    });

    describe('GET /weather/forecast', () => {
        it('should return weather forecast for a valid location', async () => {
            axios.get.mockResolvedValueOnce({ data: mockForecastData });

            const response = await request(app).get('/weather/forecast?location=TestCity');
            expect(response.status).toBe(200);
            expect(response.body.list).toHaveLength(2);
            expect(response.body.list[0].main.temp).toBe(20.0);
        });

        it('should return 400 if location is not provided', async () => {
            const response = await request(app).get('/weather/forecast');
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Location is required');
        });

        it('should return 500 if OpenWeather API fails', async () => {
            axios.get.mockRejectedValueOnce(new Error('API Error'));

            const response = await request(app).get('/weather/forecast?location=TestCity');
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Failed to fetch forecast data');
        });
    });
});
