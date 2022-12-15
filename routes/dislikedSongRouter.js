const express = require('express');
const dislikedSongRouter = express.Router();
const DislikedSong = require('../models/dislikedSong');

dislikedSongRouter
  .route('/')
  // Get disliked songs by user
  .put((req, res, next) => {
    DislikedSong.find({ user: { $in: req.body } }, (err, dislikedSongs) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.status(200).send(dislikedSongs);
    });
  })
  // Dislike a song
  .post((req, res, next) => {
    req.body.user = req.auth._id;
    const newDislikedSong = new DislikedSong(req.body);
    newDislikedSong.save((err, savedSong) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.status(201).send(savedSong);
    });
  });

module.exports = dislikedSongRouter;
