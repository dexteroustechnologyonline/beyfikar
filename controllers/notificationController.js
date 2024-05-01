const Notification = require("../models/NotificationModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


exports.createNotification = async (req, res, next) => {
  try {
    let virifyToken = await Notification.findOne({ deviceToken: req.body.deviceToken, });

    if (!virifyToken) {
      const notification = await Notification.create(req.body);
      res.status(201).json({
        success: true,
        notification,
      });
    }
    return res.status(200).json({
      success: true,
      message: " deviceToken already exist",
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

exports.getAllNotifications = catchAsyncErrors(async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({
      success: true,
      notifications,
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