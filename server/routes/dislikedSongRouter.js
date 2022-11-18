const express = require('express');
const dislikedSongRouter = express.Router();
const DislikedSong = require('../models/dislikedSong');

module.exports = dislikedSongRouter;
