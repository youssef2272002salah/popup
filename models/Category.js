const mongoose = require('mongoose');
const Picture = require('./Picture');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
  },
  picture: {
    type: Schema.Types.ObjectId,
    ref: 'Picture',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
