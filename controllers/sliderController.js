const Slider = require("../models/sliderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createSlider = async (req, res, next) => {
  try {
    const slider = await Slider.create(req.body);
    res.status(201).json({
      success: true,
      slider,
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

exports.getAllSlider = catchAsyncErrors(async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json({
      success: true,
      sliders,
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

exports.UpdateSlider = catchAsyncErrors(async (req, res, next) => {
  try {
    let slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(500).json({
        success: false,
        message: "slider not found",
      });
    }
    slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      slider: slider,
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

exports.DeleteSlider = catchAsyncErrors(async (req, res, next) => {
  try {
    let slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(500).json({
        success: false,
        message: "Slider not found",
      });
    }
    await slider.remove();
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

exports.SliderUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let slider = await Slider.findOne({ URL: req.params.url });

    if (!slider) {
      return res.status(500).json({
        success: false,
        message: "new slider Url",
      });
    }

    return res.status(200).json({
      success: true,
      message: " slider Url already exist",
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

exports.UploadSliderDeskImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "Slider/DesktopImage",
        width: 1920,
        height: 637,
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

exports.UploadSliderMobImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobileImage = await cloudinary.v2.uploader.upload(
      req.body.mobileImage,
      {
        folder: "Slider/MobileImage",
        width: 624,
        height: 320,
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

exports.sliderbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(500).json({
        success: false,
        message: "slider not found",
      });
    }
    res.status(200).json({
      success: true,
      slider: slider,
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

exports.slidercatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let slider = await Slider.find({ superCategoryId: req.params.id });
    if (!slider) {
      return res.status(500).json({
        success: false,
        message: "slider not found",
      });
    }
    res.status(200).json({
      success: true,
      slider: slider,
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
