const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getMyProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    .populate({
      path: 'likes',
      populate: {
        path: 'picture',
        model: 'Picture', // Ensure the correct model is being referenced
        select: 'url', // Select only the 'url' field
      },
    });

     res.status(200).json({
        status: "success",
        massage: "User retrieved successfully",
        data: {
            user
        }
    });
})

exports.getAllUsers = catchAsync(async (req, res, next) => {
    
    const users = await User.find();
    res.status(200).json({
        status: "success",
        massage: "Users retrieved successfully",
        results: users.length,
        data: {
            users
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    .populate({
      path: 'likes',
      populate: {
        path: 'picture',
        model: 'Picture', // Ensure the correct model is being referenced
        select: 'url', // Select only the 'url' field
      },
    });
        res.status(200).json({
        status: "success",
        massage: "User retrieved successfully",
        data: {
            user
        }
    });
})


exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: "success",
        massage: "User updated successfully",
        data: {
            user
        }
    });
})


exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        massage: "User deleted successfully",
        data: null
    });
})


