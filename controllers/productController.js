const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    })
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

exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      product: product
    })
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
exports.filterSlugurl = catchAsyncErrors(async (req, res) => {
  try {
    let product = await Product.find();
    let count = 0
    for (let index = 0; index < product.length; index++) {
      let currProduct = product[index];

      const regex = /[`~!@#$%^&*()_+{}[\]\\|,.//?;':"]/g

      if (currProduct.Url.match(regex)) {
      
        count = count + 1
      }
      // currProduct = currProduct.Url.trim()
      //   .toLowerCase()
      //   .replace(" ", "-")
      //   .replace(/[.*+&?^ $@#%^!'{}()|[\]\\]/g, "-")
      //   .replace("--", "-")
      //   .replace("---", "-")
      //   .replace("----", "-")
      //   .replace("/", "-")
      //   .replace("//", "-")
      //   .replace("///", "-");
      // currProduct = await Product.findByIdAndUpdate(currProduct._id, currProduct, {
      //   new: true,
      //   useFindAndModify: false,
      //   runValidators: true,
      // });
    }


    res.status(200).json({
      success: true,
      count: count,
      // product: product
    })
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

exports.UpdateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product: product,
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

exports.DeleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    await product.remove()
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
      let product = await Product.findOne({ slugUrl: req.params.slugurl, });

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "new Product SlugUrl",
        });
      }

      return res.status(200).json({
        success: true,
        message: " Product SlugUrl already exist",
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

exports.UploadProductImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(req.body.desktopImage, {
      folder: "Product/DesktopImage",
      width: 500,
      crop: "scale",
    });
    const desktopImages = desktopImage.secure_url;

    const mobileimage = await cloudinary.v2.uploader.upload(req.body.desktopImage, {
      folder: "Product/MobileImage",
      width: 160,
      crop: "scale",
    });
    const mobileimages = mobileimage.secure_url;
    res.status(200).json({
      success: true,
      desktopImages,
      mobileimages
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