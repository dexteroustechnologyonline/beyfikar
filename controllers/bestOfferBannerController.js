const BestOfferBanner = require("../models/bestOfferBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createBestOfferBanner = async (req, res, next) => {
  try {
    const bestOfferBanner = await BestOfferBanner.create(req.body);
    res.status(201).json({
      success: true,
      bestOfferBanner,
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

exports.getAllBestOfferBanner = catchAsyncErrors(async (req, res) => {
  try {
    const bestOfferBanner = await BestOfferBanner.find();
    res.status(200).json({
      success: true,
      bestOfferBanner,
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

exports.UpdateBestOfferBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let bestOfferBanner = await BestOfferBanner.findById(req.params.id);
    if (!bestOfferBanner) {
      return res.status(500).json({
        success: false,
        message: "bestOfferBanner not found",
      });
    }
    bestOfferBanner = await BestOfferBanner.findByIdAndUpdate(
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
      bestOfferBanner: bestOfferBanner,
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
        folder: "BestOffer/DesktopImage",
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
        folder: "BestOffer/MobileImage",
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
        folder: "BestOffer/PosterImage",
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

exports.DeleteBestOfferBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let bestOfferBanner = await BestOfferBanner.findById(req.params.id);
    if (!bestOfferBanner) {
      return res.status(500).json({
        success: false,
        message: "bestOfferBanner not found",
      });
    }
    await bestOfferBanner.remove();
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
