const InFocusToday = require("../models/inFocusTodayModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createInFocusToday = async (req, res, next) => {
  try {
    const infocusToday = await InFocusToday.create(req.body);
    res.status(201).json({
      success: true,
      infocusToday,
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

exports.getAllInFocusToday = catchAsyncErrors(async (req, res) => {
  try {
    const infocusToday = await InFocusToday.find();
    res.status(200).json({
      success: true,
      infocusToday,
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

exports.UpdateInFocusToday = catchAsyncErrors(async (req, res, next) => {
  try {
    let infocusToday = await InFocusToday.findById(req.params.id);
    if (!infocusToday) {
      return res.status(500).json({
        success: false,
        message: "infocusToday not found",
      });
    }
    infocusToday = await InFocusToday.findByIdAndUpdate(
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
      infocusToday: infocusToday,
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
        folder: "FocusToday/DesktopImage",
        width: 360,
        height: 429,
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
        folder: "FocusToday/MobileImage",
        width: 360,
        height: 429,
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
        folder: "FocusToday/PosterImage",
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

exports.DeleteInFocusToday = catchAsyncErrors(async (req, res, next) => {
  try {
    let infocusToday = await InFocusToday.findById(req.params.id);
    if (!infocusToday) {
      return res.status(500).json({
        success: false,
        message: "infocusToday not found",
      });
    }
    await infocusToday.remove();
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
