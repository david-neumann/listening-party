const express = require('express');
const likedSongRouter = express.Router();
const LikedSong = require('../models/likedSong');

likedSongRouter
  .route('/')
  // Like a song
  .post((req, res, next) => {
    req.body.user = req.auth._id;
    const newLikedSong = new LikedSong(req.body);
    newLikedSong.save((err, savedSong) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.status(201).send(savedSong);
    });
  });

module.exports = likedSongRouter;
