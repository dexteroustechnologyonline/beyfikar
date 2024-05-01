const SubcategorySlider = require("../models/subCategoriSlider");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createSubCatBanner = async (req, res, next) => {
  try {
    const subcategorySlider = await SubcategorySlider.create(req.body);
    res.status(201).json({
      success: true,
      subcategorySlider,
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
    const subcategorySliders = await SubcategorySlider.find();
    res.status(200).json({
      success: true,
      subcategorySliders,
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
    let subcategorySlider = await SubcategorySlider.findById(req.params.id);
    if (!subcategorySlider) {
      return res.status(500).json({
        success: false,
        message: "subcategorySlider not found",
      });
    }
    subcategorySlider = await SubcategorySlider.findByIdAndUpdate(
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
      subcategorySlider: subcategorySlider,
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
    let subcategorySlider = await SubcategorySlider.findById(req.params.id);
    if (!subcategorySlider) {
      return res.status(500).json({
        success: false,
        message: "subcategorySlider not found",
      });
    }
    await subcategorySlider.remove();
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
    let subcategorySlider = await SubcategorySlider.findOne({
      URL: req.params.url,
    });

    if (!subcategorySlider) {
      return res.status(500).json({
        success: false,
        message: "new subcategorySlider Url",
      });
    }

    return res.status(200).json({
      success: true,
      message: " subcategorySlider Url already exist",
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

exports.UploadSubCatBannerDeskImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const desktopImage = await cloudinary.v2.uploader.upload(
        req.body.desktopImage,
        {
          folder: "SubCatSlider/DesktopImage",
          width: 382,
          height: 231,
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
  }
);

exports.UploadSubCatBannerMobImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const mobileImage = await cloudinary.v2.uploader.upload(
        req.body.mobileImage,
        {
          folder: "SubCatSlider/MobileImage",
          width: 382,
          height: 231,
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
  }
);

exports.subcatBannerbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategorySlider = await SubcategorySlider.findById(req.params.id);
    if (!subcategorySlider) {
      return res.status(500).json({
        success: false,
        message: "subcategorySlider not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategorySlider: subcategorySlider,
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
    let subcategorySlider = await SubcategorySlider.find({
      superCategoryId: req.params.id,
    });
    if (!subcategorySlider) {
      return res.status(500).json({
        success: false,
        message: "subcategorySlider not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategorySlider: subcategorySlider,
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
    let subcategorySlider = await SubcategorySlider.find({
      SubCatId: req.params.id,
    });
    if (!subcategorySlider) {
      return res.status(500).json({
        success: false,
        message: "subcategorySlider not found",
      });
    }
    res.status(200).json({
      success: true,
      subcategorySlider: subcategorySlider,
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
