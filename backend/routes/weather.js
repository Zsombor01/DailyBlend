const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/current", async (req, res) => {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=eng&appid=${WEATHER_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({message: "Failed to fetch weather data"});
        console.error(err);
    }
});

router.get("/forecast", async (req, res) => {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=eng&appid=${WEATHER_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({message: "Failed to fetch forecast data"});
        console.error(err);
    }
});

module.exports = router;
