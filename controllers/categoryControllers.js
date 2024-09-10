const Category = require('../models/Category');
const Picture = require('../models/Picture');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('cloudinary').v2;
const AppError = require('../utils/appError');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find().populate('picture');
    res.status(200).json({
        status: 'success',
        massage: 'Categories retrieved successfully',
        results: categories.length,
        data: {
            categories
        }
    });
});


// Get all pictures by category by ID
exports.getCategoryById = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id)

    if (category===null) {
        return next(new AppError('Category not found', 404));
    }
    console.log(category)
    const pictures = await Picture.find({ category: category._id });
    res.status(200).json({
        status: 'success',
        massage: 'Category retrieved successfully',
        data: {
            pictures
        }
    });
});


exports.createCategory = catchAsync(async (req, res, next) => {

    const result = await cloudinary.uploader.upload(req.file?.path, {
        folder: 'gallaryApp',
    });

    const newPicture = new Picture({
        url: result.secure_url,
        public_id: result.public_id,
        title: req.body.name,
        category: "66be147669356b2c395ca185", // hard code category ID for categories pictures
        uploadedBy: req.user._id,
      });
      
      const savedPicture = await newPicture.save();
      
    const category = await Category.create({
        name: req.body.name,
        picture: savedPicture._id
    });
    res.status(201).json({
        status: 'success',
        massage: 'Category created successfully',
        data: {
            category
        }
    });
});


exports.updateCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json({
        status: 'success',
        massage: 'Category updated successfully',
        data: {
            category
        }
    });
});


exports.deleteCategory = catchAsync(async (req, res, next) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        massage: 'Category deleted successfully',
        data: null
    });
})

