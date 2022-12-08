const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { expressjwt: jwt } = require('express-jwt');
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to database
mongoose.connect(process.env.MONGODB, () =>
  console.log('Connected to the database.')
);

// Routes
app.use('/server/auth', require('./routes/authRouter'));
app.use('/server/spotify', require('./routes/spotifyRouter'));
app.use(
  '/server/api',
  jwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
);
app.use('/server/api/users', require('./routes/userRouter'));
app.use('/server/api/likedsong', require('./routes/likedSongRouter'));
app.use('/server/api/dislikedsong', require('./routes/dislikedSongRouter'));

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

// Server listen
app.listen(PORT, () =>
  console.log(`Express server is running on Port ${PORT}.`)
);
