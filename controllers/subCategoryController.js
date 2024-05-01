const Subcategory = require("../models/subCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const superCategoryModel = require("../models/superCategoryModel");

exports.createSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    res.status(201).json({
      success: true,
      subcategory,
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

exports.getAllSubCategory = catchAsyncErrors(async (req, res) => {
  try {
    const subcategory = await Subcategory.find({ status: true });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let subcatfilter = []
    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = subcategory.filter((data) => data.superCategory === element.name)
      subcatfilter = [...subcatfilter, ...filterProducts]
    }
    res.status(200).json({
      success: true,
      subcategory: subcatfilter,
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
exports.getAllSubCategoryAdmin = catchAsyncErrors(async (req, res) => {
  try {
    const subcategory = await Subcategory.find();
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let subcatfilter = []
    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = subcategory.filter((data) => data.superCategory === element.name)
      subcatfilter = [...subcatfilter, ...filterProducts]
    }
    res.status(200).json({
      success: true,
      subcategory: subcatfilter,
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

exports.UpdateSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "subcategory not found",
      });
    }
    subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      subcategory: subcategory,
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

exports.DeleteSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "subcategory not found",
      });
    }
    await subcategory.remove();
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

exports.SubCatSlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findOne({
      slugUrl: req.params.slugurl,
    });

    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "new subcategory SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " subcategory SlugUrl already exist",
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

exports.UploadSubCategoryImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "SubCategory/DesktopImage",
        width: 291,
        crop: "scale",
      }
    );
    const desktopImages = desktopImage.secure_url;
    const mobileimage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "SubCategory/MobileImage",
        width: 160,
        crop: "scale",
      }
    );
    const mobileimages = mobileimage.secure_url;
    res.status(200).json({
      success: true,
      desktopImages,
      mobileimages,
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

exports.subcategorybycatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.find({ categoryId: req.params.id });
    if (!subcategory) {
      return res.status(200).json({
        success: false,
        message: "subcategory not found",
      });
    }
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let subcatfilter = []
    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = subcategory.filter((data) => data.superCategory === element.name)
      subcatfilter = [...subcatfilter, ...filterProducts]
    }

    res.status(200).json({
      success: true,
      subcategory: subcatfilter,
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

exports.subcatbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(200).json({
        success: false,
        message: "subcategory not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategory: subcategory,
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

exports.subcatbyslugurl = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await Subcategory.findOne({ slugUrl: req.params.url, status: true });
    if (!subcategory) {
      return res.status(200).json({
        success: false,
        message: "subcategory not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategory: subcategory,
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
