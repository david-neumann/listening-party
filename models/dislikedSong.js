const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikedSongSchema = new Schema(
  {
    spotifyData: {},
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    review: String,
    rating: {
      type: String,
      default: 'dislike',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DislikedSong', dislikedSongSchema);
