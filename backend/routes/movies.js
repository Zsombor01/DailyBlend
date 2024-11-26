const express = require("express");
const axios = require("axios");
const router = express.Router();

// Movie by ID API call
router.get("/", async (req, res) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY
    const TMDB_MOVIE_URL = process.env.TMDB_MOVIE_URL
    const { movie_id } = req.query

    if (!movie_id) {
        return res.status(400).json({ error: "Movie ID is required" })
    }

    const url = `${TMDB_MOVIE_URL}${movie_id}${TMDB_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch movie data" })
        console.error(err);
    }
});

// Trending movies API call
router.get("/trending", async (req, res) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY
    const TMDB_TRENDING_URL = process.env.TMDB_TRENDING_URL

    const url = `${TMDB_TRENDING_URL}${TMDB_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch trending movie data" })
        console.error(err);
    }
});

// Discover movies API call
router.get("/discover", async (req, res) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY
    const TMDB_DISCOVER_URL = process.env.TMDB_DISCOVER_URL

    const url = `${TMDB_DISCOVER_URL}${TMDB_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch discover movie data" })
        console.error(err);
    }
});

module.exports = router