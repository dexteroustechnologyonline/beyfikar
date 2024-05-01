const Supercategory = require("../models/superCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


exports.createSuperCategory = async (req, res, next) => {
  try {
    const supercategory = await Supercategory.create(req.body);
    res.status(201).json({
      success: true,
      supercategory,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
};

exports.getAllSuperCategory = async (req, res) => {
  try {
    const supercategories = await Supercategory.find()
    res.status(200).json({
      success: true,
      supercategories,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
};
exports.getUpdateAllSuperCategory = async (req, res) => {
  try {
    let supercategories = await Supercategory.find()

    for (let index = 0; index < supercategories.length; index++) {
      const supCatId = supercategories[index]._id;
      let supCat = supercategories[index];

      supCat.showProducts = false

      supCat = await Supercategory.findByIdAndUpdate(supCatId, supCat, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      supercategories,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
};

exports.UpdateSuperCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let supercategory = await Supercategory.findById(req.params.id);
    if (!supercategory) {
      return res.status(500).json({
        success: false,
        message: "supercategory not found",
      });
    }
    supercategory = await Supercategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      supercategory: supercategory,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
});

exports.DeleteSuperCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let supercategory = await Supercategory.findById(req.params.id);
    if (!supercategory) {
      return res.status(500).json({
        success: false,
        message: "supercategory not found",
      });
    }
    await supercategory.remove()
    res.status(200).json({
      success: true,

    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error
    });
  }
});
exports.SlugUrlExist = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let supercategory = await Supercategory.findOne({ slugUrl: req.params.slugurl, });

      if (!supercategory) {
        return res.status(500).json({
          success: false,
          message: "new supercategory SlugUrl",
        });
      }

      return res.status(200).json({
        success: true,
        message: " supercategory SlugUrl already exist",
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error: error
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error: error
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error: error
      });
    }
  });

exports.supercategorybyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let supercategory = await Supercategory.findById(req.params.id);
    if (!supercategory) {
      return res.status(500).json({
        success: false,
        message: "supercategory not found",
      });
    }
    res.status(200).json({
      success: true,
      supercategory: supercategory,
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