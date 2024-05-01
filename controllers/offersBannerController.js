const Offersbanner = require("../models/offersBannerModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createofferbanner = async (req, res, next) => {
  try {
    const offersbanner = await Offersbanner.create(req.body);
    res.status(201).json({
      success: true,
      offersbanner,
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

exports.getAllofferbanner = catchAsyncErrors(async (req, res) => {
  try {
    const offersbanners = await Offersbanner.find();
    res.status(200).json({
      success: true,
      offersbanners,
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

exports.Updateofferbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let offersbanner = await Offersbanner.findById(req.params.offersbannerid);
    if (!offersbanner) {
      return res.status(500).json({
        success: false,
        message: "offersbanner not found",
      });
    }
    offersbanner = await Offersbanner.findByIdAndUpdate(
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
      offersbanner: offersbanner,
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

exports.Deleteofferbanner = catchAsyncErrors(async (req, res, next) => {
  try {
    let offersbanner = await Offersbanner.findById(
      req.params.deloffersbannerid
    );
    if (!offersbanner) {
      return res.status(500).json({
        success: false,
        message: "offersbanner not found",
      });
    }
    await offersbanner.remove();
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

exports.UploadofferbannerDeskImage = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const desktopImage = await cloudinary.v2.uploader.upload(
        req.body.desktopImage,
        {
          folder: "OfferBanner/DesktopImage",
          width: 1500,
          height: 470,
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

exports.UploadofferbannerMobImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const mobileImage = await cloudinary.v2.uploader.upload(
      req.body.mobileImage,
      {
        folder: "OfferBanner/MobileImage",
        width: 500,
        height: 226,
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
