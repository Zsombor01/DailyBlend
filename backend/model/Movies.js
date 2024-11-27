const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    watchList: {
        type: [Number],
    },
    favouritesList: {
        type: [Number],
    },
    watchedList: {
        type: [Number],
    }
});

const Movies = mongoose.model('Movie', MoviesSchema);

module.exports = Movies;