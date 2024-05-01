const Pinamounttable = require("../models/pinAmountTableModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createPinAmount = async (req, res, next) => {
  try {
    const pinamounttable = await Pinamounttable.create(req.body);
    res.status(201).json({
      success: true,
      pinamounttable,
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

exports.getAllPinAmount = catchAsyncErrors(async (req, res) => {
  try {
    const pinamounttables = await Pinamounttable.find();
    res.status(200).json({
      success: true,
      pinamounttables,
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

exports.UpdatePinAmount = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinamounttable = await Pinamounttable.findById(req.params.id);
    if (!pinamounttable) {
      return res.status(500).json({
        success: false,
        message: "Pinamounttable not found",
      });
    }
    pinamounttable = await Pinamounttable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      pinamounttable: pinamounttable,
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

exports.DeletePinAmount = catchAsyncErrors(async (req, res, next) => {
  try {
    let pinamounttable = await Pinamounttable.findById(req.params.id);
    if (!pinamounttable) {
      return res.status(500).json({
        success: false,
        message: "Pinamounttable not found",
      });
    }
    await pinamounttable.remove();
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
