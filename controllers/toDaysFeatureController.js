const ToDaysFeatured = require("../models/toDaysFeatureModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createToDaysFeatured = async (req, res, next) => {
  try {
    const todaysFeatured = await ToDaysFeatured.create(req.body);
    res.status(201).json({
      success: true,
      todaysFeatured,
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

exports.getAllToDaysFeatured = catchAsyncErrors(async (req, res) => {
  try {
    const todaysFeatured = await ToDaysFeatured.find();
    res.status(200).json({
      success: true,
      todaysFeatured,
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

exports.UpdateToDaysFeatured = catchAsyncErrors(async (req, res, next) => {
  try {
    let todaysFeatured = await ToDaysFeatured.findById(req.params.id);
    if (!todaysFeatured) {
      return res.status(500).json({
        success: false,
        message: "todaysFeatured not found",
      });
    }
    todaysFeatured = await ToDaysFeatured.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      todaysFeatured: todaysFeatured,
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

exports.UploadDeskImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "TodayFeatured/DesktopImage",
        width: 382,
        height: 231,
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
});

exports.UploadMobImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobileImage = await cloudinary.v2.uploader.upload(
      req.body.mobileImage,
      {
        folder: "TodayFeatured/MobileImage",
        width: 382,
        height: 231,
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

exports.UploadPosterImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const posterImage = await cloudinary.v2.uploader.upload(
      req.body.posterImage,
      {
        folder: "TodayFeatured/PosterImage",
        width: 869,
        height: 853,
        crop: "scale",
      }
    );

    const posterImages = posterImage.secure_url;
    res.status(200).json({
      success: true,
      posterImages,
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

exports.DeleteToDaysFeatured = catchAsyncErrors(async (req, res, next) => {
  try {
    let todaysFeatured = await ToDaysFeatured.findById(req.params.id);
    if (!todaysFeatured) {
      return res.status(500).json({
        success: false,
        message: "todaysFeatured not found",
      });
    }
    await todaysFeatured.remove();
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
