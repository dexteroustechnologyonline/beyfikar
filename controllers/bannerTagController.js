const Bannertag = require("../models/bannerTagModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createBannertag = async (req, res, next) => {
  try {
    const bannertag = await Bannertag.create(req.body);
    res.status(201).json({
      success: true,
      bannertag,
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

exports.getAllBannertag = catchAsyncErrors(async (req, res) => {
  try {
    const bannertags = await Bannertag.find();
    res.status(200).json({
      success: true,
      bannertags,
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

exports.UpdateBannertag = catchAsyncErrors(async (req, res, next) => {
  try {
    let bannertag = await Bannertag.findById(req.params.id);
    if (!bannertag) {
      return res.status(500).json({
        success: false,
        message: "bannertag not found",
      });
    }
    bannertag = await Bannertag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      bannertag: bannertag,
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

exports.DeleteBannertag = catchAsyncErrors(async (req, res, next) => {
  try {
    let bannertag = await Bannertag.findById(req.params.id);
    if (!bannertag) {
      return res.status(500).json({
        success: false,
        message: "bannertag not found",
      });
    }
    await bannertag.remove();
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

exports.UploadBannertagDeskImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "BannerTag/DesktopImage",
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
});

exports.UploadBannertagMobImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobileImage = await cloudinary.v2.uploader.upload(
      req.body.mobileImage,
      {
        folder: "BannerTag/MobileImage",
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


exports.Bannertagbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let bannertag = await Bannertag.findById(req.params.id);
    if (!bannertag) {
      return res.status(500).json({
        success: false,
        message: "bannertag not found",
      });
    }
    res.status(200).json({
      success: true,
      bannertag: bannertag,
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

