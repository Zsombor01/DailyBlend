require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('API is running...');
})

mongoose.connection.once('open', () => {
    console.log('MongoDB Connected...');
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
})