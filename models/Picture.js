const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }]
});

const Picture = mongoose.model('Picture', pictureSchema);
module.exports = Picture;
