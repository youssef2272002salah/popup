const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Picture',
    required: true
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
