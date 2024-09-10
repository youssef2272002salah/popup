const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeControllers');
const authControllers = require('../controllers/authControllers');


// Route to like a picture
router.post('/:id', authControllers.protect, likeController.likePicture);

// Route to unlike a picture
router.post('/remove/:id', authControllers.protect, likeController.unlikePicture);

// Route to get all likes
router.get('/:id/all', likeController.getLikesForPicture);

module.exports = router;