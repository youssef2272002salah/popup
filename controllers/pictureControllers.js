const Picture = require('../models/Picture');
const Category = require('../models/Category');
const cloudinary = require('cloudinary').v2;
const sendReportMassage = require('../utils/reportPicture');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a new picture
exports.uploadPicture = async (req, res) => {
  try {

    const result = await cloudinary.uploader.upload(req.file?.path, {
      folder: 'gallaryApp',
    });
    

    const category = await Category.findOne({ name: req.body.category });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }


    const newPicture = new Picture({
      url: result.secure_url,
      public_id: result.public_id,
      title: req.body.title,
      category: category._id, // Use the category ID
      uploadedBy: req.user._id,
    });


    const savedPicture = await newPicture.save();

    res.status(201).json(savedPicture);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to upload picture' });
  }
};



exports.getAllPictures = async (req, res) => {
  try {
    const pictures = await Picture.find().populate('category').populate('uploadedBy');

    if (!pictures) {
      return res.status(404).json({ error: 'No pictures found' });
    }

    res.status(200).json(pictures);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch pictures' });
  }
};



exports.getPictureById = async (req, res) => {
  try {
    console.log(req.params.id)
    const picture = await Picture.findById(req.params.id).populate('category').populate('uploadedBy');
    console.log(picture)
    if (!picture) {
      return res.status(404).json({ error: 'Picture not found' });
    }
    res.status(200).json(picture);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch picture' });
  }
};

exports.updatePicture = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    };

    const updatedPicture = await Picture.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedPicture) {
      return res.status(404).json({ error: 'Picture not found' });
    }

    res.status(200).json(updatedPicture);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update picture' });
  }
};

// Delete a picture
exports.deletePicture = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ error: 'Picture not found' });
    }

    await cloudinary.uploader.destroy(picture.public_id);

    await Picture.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Picture deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete picture' });
  }
};



exports.downloadPicture = async (req, res) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ error: 'Picture not found' });
    }
    res.redirect(picture.url);
  } catch (err) {
    res.status(500).json({ error: 'Failed to download picture' });
  }
}


exports.getMostLikedPictures = async (req, res) => {
  try {
    const mostlikedPictures = await Picture.find().sort ({ likes: -1 }).limit(10);
    res.status(200).json(mostlikedPictures);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch most liked pictures' });
  }
}

exports.searchPictures = async (req, res) => {
  try {
    const searchResults = await Picture.find({ title: { $regex: req.query.q, $options: 'i' } });
    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search pictures' });
  }
}

exports.reportPicture = async (req, res) => {
  try {
    const pictureId = req.params.id;
    const userId = req.user._id;
    const reason = req.body.reason; 
    massage = `User ID: ${userId} has reported Picture ID: ${pictureId}.\nReason: ${reason}`
    console.log(massage)
    const toEmail = 'youssefsalah2272002@gmail.com';

   await sendReportMassage (toEmail,massage);

    res.status(200).json({
      status: 'success',
      message: 'Report has been sent to the admin',
    });
  } catch (err) {
    console.error('Error reporting picture:', err);
    res.status(500).json({ error: 'Failed to report picture' });
  }
};

