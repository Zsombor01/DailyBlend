require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const corsOptions = require('./config/corsOptions');
const { forwardAuthenticated, ensureAuthenticated } = require('./config/auth.js');
const PORT = process.env.PORT || 3000;

const app = express();

require('./config/passport')(passport);

connectDB();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/register', require('./routes/register.js'));
app.use('/login', forwardAuthenticated, require('./routes/login.js'));
app.use('/logout', ensureAuthenticated, require('./routes/logout.js'));
app.use('/auth', ensureAuthenticated, require('./routes/authStatus.js'));
app.use('/profile', ensureAuthenticated, require('./routes/profile.js'));
app.use('/movies', require('./routes/movies.js'));
app.use('/weather', require('./routes/weather.js'));
app.use('/todos', require('./routes/todos.js'));



app.get('/', (req, res) => {
  res.send('API is running...');
})

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected...');
  app.listen(PORT, console.log(`Server running on port ${PORT}`));
})