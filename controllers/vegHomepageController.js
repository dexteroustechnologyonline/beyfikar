const VegHomepage = require("../models/vegHomepageModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createVegHomepage = async (req, res, next) => {
  try {
    const vegHomepage = await VegHomepage.create(req.body);
    res.status(201).json({
      success: true,
      vegHomepage,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
};
 
exports.getAllVegHomepage = catchAsyncErrors (async(req,res) =>{
  try {
      const vegHomepage = await VegHomepage.find();
      res.status(200).json({
          success: true,
          vegHomepage,
      })
  } catch (error) {
      res.status(501).json({
          success: false,
          massage: error._message,
          error:error
        });
        res.status(400).json({
          success: false,
          massage: error._message,
          error:error
        });
        res.status(500).json({
          success: false,
          massage: error._message,
          error:error
        });
  }
});

exports.UpdateVegHomepage = catchAsyncErrors(async (req, res, next) => {
  try {
    let vegHomepage = await VegHomepage.findById(req.params.id);
    if (!vegHomepage) {
      return res.status(500).json({
        success: false,
        message: "vegHomepage not found",
      });
    }
    vegHomepage = await VegHomepage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      vegHomepage:vegHomepage,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});


