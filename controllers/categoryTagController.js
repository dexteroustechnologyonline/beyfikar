const Categorytag = require("../models/categoryTagModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createCategoryTag = async (req, res, next) => {
  try {
    const categorytag = await Categorytag.create(req.body);
    res.status(201).json({
      success: true,
      categorytag,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
};

exports.getAllCategoryTag = catchAsyncErrors(async (req, res) => {
  try {
    const categorytags = await Categorytag.find();
    res.status(200).json({
      success: true,
      categorytags,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.UpdateCategoryTag = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.findById(req.params.id);
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    categorytag = await Categorytag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      categorytag: categorytag,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.DeleteCategoryTag = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.findById(req.params.id);
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    await categorytag.remove();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.UploadCategoryTagDeskImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const desktopImage = await cloudinary.v2.uploader.upload(
        req.body.desktopImage,
        {
          folder: "CategoryTag/DesktopImage",
          width: 1500,
          height: 470,
          crop: "scale",
        }
      );
      const desktopImages = desktopImage.secure_url;
      res.status(200).json({
        success: true,
        desktopImages,
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error: error,
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error: error,
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error: error,
      });
    }
  }
);

exports.UploadCategoryTagMobImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobileImage = await cloudinary.v2.uploader.upload(
      req.body.mobileImage,
      {
        folder: "CategoryTag/MobileImage",
        width: 500,
        height: 226,
        crop: "scale",
      }
    );
    const mobileImages = mobileImage.secure_url;
    res.status(200).json({
      success: true,
      mobileImages,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});


exports.Categorytagbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.findById(req.params.id);
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    res.status(200).json({
      success: true,
      categorytag: categorytag,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});


exports.Categorytagbysupercatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.find({ superCategoryId: req.params.id });
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    res.status(200).json({
      success: true,
      categorytag: categorytag,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
exports.Categorytagbycatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let categorytag = await Categorytag.find({ CatId: req.params.id });
    if (!categorytag) {
      return res.status(500).json({
        success: false,
        message: "categorytag not found",
      });
    }
    res.status(200).json({
      success: true,
      categorytag: categorytag,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});