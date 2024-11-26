const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Movies = require('../model/Movies');

router.get('/movieData/:user_name', async (req, res) => {
    const { user_name } = req.params

    try {
        console.log(user_name)
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

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
})

module.exports = router;