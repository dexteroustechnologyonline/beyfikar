const FeaturedInWeek = require("../models/featuresInWeekModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createFeaturedInWeek = async (req, res, next) => {
  try {
    const featuredInWeek = await FeaturedInWeek.create(req.body);
    res.status(201).json({
      success: true,
      featuredInWeek,
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

exports.getAllFeaturedInWeek = catchAsyncErrors(async (req, res) => {
  try {
    const featuredInWeek = await FeaturedInWeek.find();
    res.status(200).json({
      success: true,
      featuredInWeek,
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

exports.UpdateFeaturedInWeek = catchAsyncErrors(async (req, res, next) => {
  try {
    let featuredInWeek = await FeaturedInWeek.findById(req.params.id);
    if (!featuredInWeek) {
      return res.status(500).json({
        success: false,
        message: "featuredInWeek not found",
      });
    }
    featuredInWeek = await FeaturedInWeek.findByIdAndUpdate(
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
      featuredInWeek: featuredInWeek,
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
        folder: "FeaturedInWeek/DesktopImage",
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
        folder: "FeaturedInWeek/MobileImage",
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
        folder: "FeaturedInWeek/PosterImage",
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

exports.DeleteFeaturedInWeek = catchAsyncErrors(async (req, res, next) => {
  try {
    let featuredInWeek = await FeaturedInWeek.findById(req.params.id);
    if (!featuredInWeek) {
      return res.status(500).json({
        success: false,
        message: "featuredInWeek not found",
      });
    }
    await featuredInWeek.remove();
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
