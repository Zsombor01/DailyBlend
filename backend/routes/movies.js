const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require('../model/User');
const Movies = require('../model/Movies');
const { MovieListType } = require("../../shared/enums/MovieListType");

// User movies
router.put('/updateUserData/:user_name&:movie_id&:list_type', async (req, res) => {
    const user_name = req.params.user_name
    const movie_id = req.params.movie_id
    const list_type = req.params.list_type

    try {
        const user = await User.findOne({ name: user_name })
        if (!user) {
            return res.status(404).send('User not found')
        }
        const user_id = user._id

        if (list_type == MovieListType.WATCHLIST) {
            await Movies.findOneAndUpdate(
                { userID: user_id }, { $push: { watchList: movie_id } }
            )
        } else if (list_type == MovieListType.FAVOURITE) {
            await Movies.findOneAndUpdate(
                { userID: user_id }, { $push: { favouritesList: movie_id } }
            )
        } else if (list_type == MovieListType.WATCHED) {
            await Movies.findOneAndUpdate(
                { userID: user_id }, { $push: { watchedList: movie_id } }
            )
        }

        res.status(200).send({ message: 'Item added' });
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
});

router.get('/userData/:user_name', async (req, res) => {
    const user_name = req.params.user_name

    try {
        const user = await User.findOne({ name: user_name })
        if (!user) {
            return res.status(404).send('User not found')
        }

        const user_id = user._id
        const movies = await Movies.findOne({ userID: user_id })
        if (!movies) {
            return res.status(404).send('Movies not found')
        }

        res.status(200).send({ movieListData: movies })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
});

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