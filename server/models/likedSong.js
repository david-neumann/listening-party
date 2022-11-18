const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedSongSchema = new Schema({
  spotifyData: {},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  review: String,
});

module.exports = mongoose.model('LikedSong', likedSongSchema);
