const express = require('express');
const likedSongRouter = express.Router();
const LikedSong = require('../models/likedSong');

likedSongRouter
  .route('/')
  // Get liked songs by user
  .put((req, res, next) => {
    LikedSong.find({ user: { $in: req.body } }, (err, likedSongs) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.status(200).send(likedSongs);
    });
  })
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
