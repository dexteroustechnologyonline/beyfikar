const Brand = require("../models/brandModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");


exports.createBrand = async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({
      success: true,
      brand,
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
 
exports.getAllBrand = catchAsyncErrors (async(req,res) =>{
  try {
      const brands = await Brand.find();
      res.status(200).json({
          success: true,
          brands,
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

exports.UpdateBrand = catchAsyncErrors(async (req, res, next) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "brand not found",
      });
    }
    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      brand:brand,
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

exports.DeleteBrand = catchAsyncErrors(async (req, res, next) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "brand not found",
      });
    }
    await brand.remove()
      res.status(200).json({
      success: true,
      
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

exports.BrandSlugUrlExist = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let brand = await Brand.findOne({ slugUrl: req.params.slugurl,  });

    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "new brand SlugUrl",
      });
    } 

    return res.status(200).json({
      success: true,
      message: " brand SlugUrl already exist",
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

exports.UploadBrandImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(req.body.desktopImage, {
      folder: "Brand/DesktopImage",
      width: 480,
      crop: "scale",
    });
    const desktopImages =  desktopImage.secure_url;

    const mobileimage = await cloudinary.v2.uploader.upload(req.body.desktopImage, {
      folder: "Brand/MobileImage",
      width: 160,
      crop: "scale",
    });
    const mobileimages =  mobileimage.secure_url;
    res.status(200).json({
      success: true,
      desktopImages,
      mobileimages
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

exports.brandbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(500).json({
        success: false,
        message: "brand not found",
      });
    }
    res.status(200).json({
      success: true,
      brand: brand,
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

