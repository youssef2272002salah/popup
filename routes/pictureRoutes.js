const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/pictureControllers');
const authControllers = require('../controllers/authControllers');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });



router
  .route('/')
  .post(authControllers.protect,authControllers.restrictTo('admin'), upload.single('file'), pictureController.uploadPicture)
  .get(pictureController.getAllPictures);

router.get('/mostlikes', pictureController.getMostLikedPictures);

router
  .route('/:id')
  .get(pictureController.getPictureById)
  .put(authControllers.protect, authControllers.restrictTo('admin'), pictureController.updatePicture)
  .delete( pictureController.deletePicture);

router.get('/:id/download', pictureController.downloadPicture);

router.post('/search', pictureController.searchPictures);

router.post('/:id/report',authControllers.protect, pictureController.reportPicture);

module.exports = router;
