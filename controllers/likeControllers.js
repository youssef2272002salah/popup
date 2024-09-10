const Like = require('../models/Like');
const Picture = require('../models/Picture');
const User = require('../models/User');

// Like a picture
exports.likePicture = async (req, res) => {
  try {
    const pictureId = req.params.id;
    const userId = req.user._id;


    // Check if the user has already liked the picture
    const existingLike = await Like.findOne({ picture: pictureId, likedBy: userId });
    if (existingLike) {
      return res.status(400).json({ error: 'You have already liked this picture' });
    }

    // Create a new like
    const newLike = new Like({
      picture: pictureId,
      likedBy: userId
    });

    await newLike.save(); // Save the new like to the database

    // Add the like to the picture's likes array
    const picture = await Picture.findById(pictureId);
    picture.likes.push(newLike._id);
    await picture.save();


    // Add the like to the user's likes array
    const user = await User.findById(userId);
    user.likes.push(newLike._id);
    await user.save();


    res.status(201).json(newLike);
  } catch (err) {
    console.error('Error liking picture:', err);
    res.status(500).json({ error: 'Failed to like picture' });
  }
};


// Unlike a picture
exports.unlikePicture = async (req, res) => {
  try {
    const pictureId = req.params.id;
    const userId = req.user._id;

    // Find and delete the like
    const like = await Like.findOneAndDelete({ picture: pictureId, likedBy: userId });
    if (!like) {
      return res.status(400).json({ error: 'You have not liked this picture' });
    }

    // Remove the like from the picture's likes array
    const picture = await Picture.findById(pictureId);
    picture.likes.pull(like._id);
    await picture.save();


    // Remove the like from the user's likes array
    const user = await User.findById(userId);
    user.likes.pull(like._id);
    await user.save();

    res.status(200).json({ message: 'Picture unliked successfully' });
  } catch (err) {
    console.error('Error unliking picture:', err);
    res.status(500).json({ error: 'Failed to unlike picture' });
  }
};

// Get all likes for a picture
exports.getLikesForPicture = async (req, res) => {
  try {
    const pictureId = req.params.id;
    const likes = await Like.find({ picture: pictureId }).populate('likedBy', 'fullname');

    res.status(200).json(likes);
  } catch (err) {
    console.error('Error retrieving likes:', err);
    res.status(500).json({ error: 'Failed to retrieve likes' });
  }
};
