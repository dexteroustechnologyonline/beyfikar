const Coupon = require("../models/couponModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({
      success: true,
      coupon,
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

exports.getAllCoupon = catchAsyncErrors(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      success: true,
      coupons,
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

exports.UpdateCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(500).json({
        success: false,
        message: "coupon not found",
      });
    }
    coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      coupon: coupon,
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

exports.DeleteCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(500).json({
        success: false,
        message: "Coupon not found",
      });
    }
    await coupon.remove();
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


exports.Couponbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(500).json({
        success: false,
        message: "coupon not found",
      });
    }
    res.status(200).json({
      success: true,
      coupon: coupon,
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
