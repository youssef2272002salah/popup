const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const authControllers = require('../controllers/authControllers');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Route to get all categories
router.get('/', categoryController.getAllCategories);

// Route to get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to create a new category
// .post(authControllers.protect, upload.single('file'), pictureController.uploadPicture)

router.post('/', authControllers.protect,authControllers.restrictTo('admin'),upload.single('file'), categoryController.createCategory);

// Route to update a category
router.patch('/:id', authControllers.protect,authControllers.restrictTo('admin'), categoryController.updateCategory);

// Route to delete a category
router.delete('/:id', authControllers.protect,authControllers.restrictTo('admin'), categoryController.deleteCategory);

module.exports = router;
