const Stock = require("../models/stockModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createStock = async (req, res, next) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json({
      success: true,
      stock,
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

exports.getAllStock = catchAsyncErrors(async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json({
      success: true,
      stocks,
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

exports.UpdateStock = catchAsyncErrors(async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(500).json({
        success: false,
        message: "stock not found",
      });
    }
    stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      stock: stock,
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

exports.DeleteStock = catchAsyncErrors(async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(500).json({
        success: false,
        message: "stock not found",
      });
    }
    await stock.remove();
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
