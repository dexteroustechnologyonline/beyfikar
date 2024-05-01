const TopBanner = require("../models/topBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createTopBanner = async (req, res, next) => {
  try {
    const topBanner = await TopBanner.create(req.body);
    res.status(201).json({
      success: true,
      topBanner,
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

exports.getAllTopBanner = catchAsyncErrors(async (req, res) => {
  try {
    const topBanner = await TopBanner.find();
    res.status(200).json({
      success: true,
      topBanner,
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

exports.UpdateTopBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let topBanner = await TopBanner.findById(req.params.id);
    if (!topBanner) {
      return res.status(500).json({
        success: false,
        message: "topBanner not found",
      });
    }
    topBanner = await TopBanner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      topBanner: topBanner,
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
        folder: "TopBanner/DesktopImage",
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
        folder: "TopBanner/MobileImage",
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
        folder: "TopBanner/PosterImage",
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

exports.DeleteTopBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let topBanner = await TopBanner.findById(req.params.id);
    if (!topBanner) {
      return res.status(500).json({
        success: false,
        message: "topBanner not found",
      });
    }
    await topBanner.remove();
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
