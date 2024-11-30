const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require('../model/User');
const Movies = require('../model/Movies');

const TMDB_MOVIE_URL = "https://api.themoviedb.org/3/movie/"
const TMDB_TRENDING_URL = "https://api.themoviedb.org/3/trending/movie/week"
const TMDB_DISCOVER_URL = "https://api.themoviedb.org/3/discover/movie"

// User movies
router.put('/updateUserData/:userName/:listType/:movieID', async (req, res) => {
    const { userName, listType, movieID } = req.params;

    try {
        const user = await User.findOne({ name: userName })
        if (!user) {
            return res.status(404).send('User not found')
        }
        const userID = user._id

        const movieInList = Boolean(await Movies.exists(
            {
                userID: userID,
                [listType]: { $in: [movieID] }
            }
        ))

        await Movies.findOneAndUpdate(
            { userID: userID },
            { [movieInList ? '$pull' : '$push']: { [listType]: movieID } }
        )

        return res.status(200).send(
            {
                movieID: movieID,
                userName: userName,
                listName: listType,
                action: movieInList ? "removed" : "added"
            });
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
});

router.get('/userData/:userName', async (req, res) => {
    const userName = req.params.userName

    try {
        const user = await User.findOne({ name: userName })
        if (!user) {
            return res.status(404).send('User not found')
        }

        const userID = user._id
        const movies = await Movies.findOne({ userID: userID })
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
    const { movieID } = req.query

    if (!movieID) {
        return res.status(400).json({ error: "Movie ID is required" })
    }

    const url = `${TMDB_MOVIE_URL}${movieID}${TMDB_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch movie data" })
    }
});

// Trending movies API call
router.get("/trending", async (req, res) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY

    const url = `${TMDB_TRENDING_URL}${TMDB_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch trending movie data" })
    }
});

// Discover movies API call
router.get("/discover", async (req, res) => {
    const TMDB_API_KEY = process.env.TMDB_API_KEY

    const url = `${TMDB_DISCOVER_URL}${TMDB_API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch discover movie data" })
    }
});

module.exports = router