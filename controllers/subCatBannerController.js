const Subcategorybanner = require("../models/subCategoryBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createSubCatBanner = async (req, res, next) => {
  try {
    const subcategorybanner = await Subcategorybanner.create(req.body);
    res.status(201).json({
      success: true,
      subcategorybanner,
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

exports.getAllSubCatBanner = catchAsyncErrors(async (req, res) => {
  try {
    const subcategorybanners = await Subcategorybanner.find();
    res.status(200).json({
      success: true,
      subcategorybanners,
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

exports.UpdateSubCatBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorybanner = await Subcategorybanner.findById(req.params.id);
    if (!subcategorybanner) {
      return res.status(500).json({
        success: false,
        message: "subcategorybanner not found",
      });
    }
    subcategorybanner = await Subcategorybanner.findByIdAndUpdate(
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
      subcategorybanner: subcategorybanner,
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

exports.DeleteSubCatBanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorybanner = await Subcategorybanner.findById(req.params.id);
    if (!subcategorybanner) {
      return res.status(500).json({
        success: false,
        message: "subcategorybanner not found",
      });
    }
    await subcategorybanner.remove();
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

exports.SubCatBannerUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorybanner = await Subcategorybanner.findOne({ URL: req.params.url });

    if (!subcategorybanner) {
      return res.status(500).json({
        success: false,
        message: "new subcategorybanner Url",
      });
    }

    return res.status(200).json({
      success: true,
      message: " subcategorybanner Url already exist",
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

exports.UploadSubCatBannerDeskImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "SubCatBanner/DesktopImage",
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

exports.UploadSubCatBannerMobImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobileImage = await cloudinary.v2.uploader.upload(
      req.body.mobileImage,
      {
        folder: "SubCatBanner/MobileImage",
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


exports.subcatBannerbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorybanner = await Subcategorybanner.findById(req.params.id);
    if (!subcategorybanner) {
      return res.status(500).json({
        success: false,
        message: "subcategorybanner not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategorybanner: subcategorybanner,
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


exports.subcatBannerCatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorybanner = await Subcategorybanner.find({
      superCategoryId: req.params.id,
    });
    if (!subcategorybanner) {
      return res.status(500).json({
        success: false,
        message: "subcategorybanner not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategorybanner: subcategorybanner,
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

exports.subcatBannerSubCatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorybanner = await Subcategorybanner.find({
      SubCatId: req.params.id,
    });
    if (!subcategorybanner) {
      return res.status(500).json({
        success: false,
        message: "subcategorybanner not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategorybanner: subcategorybanner,
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

