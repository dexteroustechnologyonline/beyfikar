const Grocery = require("../models/groceryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { log } = require("console");
const superCategoryModel = require("../models/superCategoryModel");

exports.createGrocery = catchAsyncErrors(async (req, res, next) => {
  try {
    const grocery = await Grocery.create(req.body);
    res.status(201).json({
      success: true,
      grocery,
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

exports.getAllGrocery = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find();
    res.status(200).json({
      success: true,
      grocery: grocery,
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
exports.getAllDeletemany = catchAsyncErrors(async (req, res) => {
  try {
    let groceries = await Grocery.deleteMany({ superCategory: "Supermart", Category: "Dry fruits,oils and masalas", SubCat: { $ne: "Dry fruits and nuts" } });;
    res.status(200).json({
      success: true,
      count: groceries.length,
      groceries: groceries,
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


exports.getAllGroceryInStock = catchAsyncErrors(async (req, res) => {
  try {
    const grocery = await Grocery.find({ OutOfStack: false });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.getAllTrending = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ Trending: true, OutOfStack: false });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.getAllHotProducts = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ HotProducts: true, OutOfStack: false });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }
    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.getAllOffers = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ Offers: true, OutOfStack: false });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }
    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)
    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.getAllDealOfTheDAy = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ Recommends: true, OutOfStack: false });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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
exports.getAllhotProducts = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ HotProducts: true, OutOfStack: false });

    const groceryfilter = grocery.filter((data) => data.superCategory !== "Supermart")

    res.status(200).json({
      success: true,
      grocery: groceryfilter,
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
exports.getAllTrendingProducts = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ Trending: true, OutOfStack: false });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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
exports.getAllOffersProducts = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({ Offers: true });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }
    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)
    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.UpdateGrocery = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "Grocery not found",
      });
    }
    grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.UpdateGroceryall = catchAsyncErrors(async (req, res, next) => {
  try {
    const groceryAll = await Grocery.find();
    for (let i = 0; i < groceryAll.length; i++) {
      let grocery = groceryAll[i];
      const groceryid = grocery._id;
      // grocery = {...grocery, OutOfStack: false }
      grocery.PackSizes = grocery.PackSizes.map((pack) => ({
        ...pack,
        OutOfStack: false,
      }));

      grocery = await Grocery.findByIdAndUpdate(groceryid, grocery, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

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

exports.filterSlugurl = catchAsyncErrors(async (req, res) => {
  try {
    let product = await Grocery.find({});
    let count = 0
    for (let index = 0; index < product.length; index++) {
      const groceryid = product[index]._id;
      let currProduct = product[index];

      // const regex = /[`~!@#$%^&*()_+{}[\]\\|,.//?;':"]/g
      // currProduct.Url = currProduct.Url.trim()
      //   .toLowerCase()
      //   .replace(" ", "-")
      //   .replace(/[.*+&?^$@#%^!'{}()|[\]\\]/g, "-")
      //   .replace("--", "-")
      //   .replace("---", "-")
      //   .replace("----", "-")
      //   .replace("/", "-")
      //   .replace("//", "-")
      //   .replace("///", "-");


      count = count + 1
      currProduct = await Grocery.findByIdAndUpdate(groceryid, currProduct, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });

    }


    res.status(200).json({
      success: true,
      count: count,
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

exports.AddGroceryPacksize = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findOne({ ProductId: req.body.ProductId });
    if (!grocery) {
      return res.status(200).json({
        success: false,
        message: "Grocery not found",
      });
    }

    grocery.PackSizes = [...grocery.PackSizes, req.body];
    grocery = await Grocery.findByIdAndUpdate(grocery._id, grocery, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.UpdateGroceryPacksize = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findOne({ ProductId: req.params.id });

    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "Grocery not found",
      });
    }
    grocery.PackSizes = [...grocery.PackSizes, req.body];

    grocery = await Grocery.findOneAndUpdate(
      { ProductId: req.params.id },
      grocery,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      grocery: grocery,
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
exports.UpdateGrocerySinglePacksize = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let grocery = await Grocery.findById(req.body.Id);

      if (!grocery) {
        return res.status(500).json({
          success: false,
          message: "Grocery not found",
        });
      }

      grocery.PackSizes = grocery.PackSizes.map((pack) => {

        if (String(pack._id) === req.body.packsizeId) {
          pack.Mrp = req.body.Mrp;
          pack.SellingPrice = req.body.SellingPrice;
          pack.OutOfStack = req.body.OutOfStack;
          pack.PackSize = req.body.PackSize;
        }
        return pack;
      });

      grocery = await Grocery.findByIdAndUpdate(req.body.Id, grocery, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        grocery: grocery,
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

exports.removeallPacksize = catchAsyncErrors(async (req, res, next) => {
  try {
    const allgrocery = await Grocery.find();
    allgrocery.forEach(async (grocery) => {
      grocery.PackSizes = [];
      grocery = await Grocery.findOneAndUpdate(
        { ProductId: grocery._id },
        grocery.PackSizes,
        {
          new: true,
          useFindAndModify: false,
          runValidators: true,
        }
      );
    });

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

exports.DeleteGrocery = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "Grocery not found",
      });
    }
    await grocery.remove();
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

exports.SlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findOne({ Url: req.params.slugurl });

    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "new Grocery SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " Grocery SlugUrl already exist",
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

exports.UploadGroceryImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "Grocery/DesktopImage",
        width: 450,
        heigth: 450,
        crop: "scale",
      }
    );
    const desktopImages = desktopImage.secure_url;

    const desktopImageIcon = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "Grocery/DesktopIcon",
        width: 75,
        heigth: 75,
        crop: "scale",
      }
    );
    const desktopImageIcons = desktopImageIcon.secure_url;

    const mobileimage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "Grocery/MobileImage",
        width: 150,
        heigth: 150,
        crop: "scale",
      }
    );
    const mobileimages = mobileimage.secure_url;

    const mobileimageIcon = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "Grocery/MobileIcon",
        width: 45,
        heigth: 45,
        crop: "scale",
      }
    );
    const mobileimageIcons = mobileimageIcon.secure_url;
    res.status(200).json({
      success: true,
      desktopImages,
      desktopImageIcons,
      mobileimages,
      mobileimageIcons,
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

exports.gatBannerTag = catchAsyncErrors(async (req, res) => {
  try {
    const grocery = await Grocery.find({
      BannerTag: { $regex: req.params.bantagname },
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.gatCategoryTag = catchAsyncErrors(async (req, res) => {
  try {
    const grocery = await Grocery.find({
      CategoryTag: { $regex: req.params.cattagname },
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.gatUniversalTag = catchAsyncErrors(async (req, res) => {
  try {
    const grocery = await Grocery.find({
      UniversalTag: { $regex: req.params.unitagname },
    });
    res.status(200).json({
      success: true,
      grocery: grocery,
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

// exports.gorcerybycatid = catchAsyncErrors(async (req, res, next) => {
//   try {
//     let grocery = await Grocery.find({ CatId: req.params.id });
//     if (!grocery) {
//       return res.status(500).json({
//         success: false,
//         message: "grocery not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       grocery: grocery,
//     });
//   } catch (error) {
//     res.status(501).json({
//       success: false,
//       massage: error._message,
//       error: error,
//     });
//     res.status(400).json({
//       success: false,
//       massage: error._message,
//       error: error,
//     });
//     res.status(500).json({
//       success: false,
//       massage: error._message,
//       error: error,
//     });
//   }
// });

exports.gorcerybycatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.find({ CatId: req.params.id });
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.gorcerybysupercatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.find({ superCategoryId: req.params.id });
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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
exports.gorcerysearchbykeywords = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.find({ "ItemName": { "$regex": `.*${req.params.keywords}*.`, "$options": "i" } })
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.getgorcerybysubcatid = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.find({ SubCatId: req.params.id });
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.myGroceryAll = catchAsyncErrors(async (req, res) => {
  try {
    const groceries = await Grocery.find();
    let emptyArray = []
    for (let index = 0; index < groceries.length; index++) {
      let groceryid = groceries[index]._id;
      let grocery = groceries[index];
      if (grocery.PackSizes.length === 0) {
        emptyArray = [...emptyArray, grocery.ItemName]
      }
      // grocery = await Grocery.findByIdAndUpdate(groceryid, grocery, {
      //   new: true,
      //   useFindAndModify: false,
      //   runValidators: true,
      // });
    }
    res.status(200).json({
      success: true,
      count: emptyArray.length,
      groceries: emptyArray,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
    res.status(400).json({
      success: false,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.Grocerybyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.findById(req.params.id);
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    res.status(200).json({
      success: true,
      grocery: grocery,
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
exports.GrocerybySlugurl = catchAsyncErrors(async (req, res, next) => {
  try {
    let grocery = await Grocery.find({ Url: req.params.url });
    if (!grocery) {
      return res.status(500).json({
        success: false,
        message: "grocery not found",
      });
    }
    res.status(200).json({
      success: true,
      grocery: grocery,
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

exports.getAllDealOfTheDayBySuperCat = catchAsyncErrors(async (req, res) => {
  try {
    const grocery = await Grocery.find({
      $and: [{ superCategoryId: req.params.id }, { Recommends: true }],
    });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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

exports.getAllHotProductsBySuperCat = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({
      $and: [{ superCategoryId: req.params.id }, { HotProducts: true }],
    });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

    res.status(200).json({
      success: true,
      groceryCount: groceryfilter.length,
      grocery: groceryfilter,
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

exports.getAlltrendingProductsBySuperCat = catchAsyncErrors(
  async (req, res) => {
    try {
      let grocery = await Grocery.find({
        $and: [{ superCategoryId: req.params.id }, { Trending: true }],
      });
      const supercategories = await superCategoryModel.find({ showProducts: true })
      let groceryfilter = []

      for (let index = 0; index < supercategories.length; index++) {
        let element = supercategories[index];
        let filterProducts = []
        filterProducts = grocery.filter((data) => data.superCategory === element.name)
        groceryfilter = [...groceryfilter, ...filterProducts]
      }

      let groceryfilteroutofstock = []

      for (let index = 0; index < groceryfilter.length; index++) {
        let element = groceryfilter[index];

        element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
        groceryfilteroutofstock = [...groceryfilteroutofstock, element]
      }

      groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)

      res.status(200).json({
        success: true,
        groceryCount: groceryfilteroutofstock.length,
        grocery: groceryfilteroutofstock,
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

exports.getAllOfferProductsBySuperCat = catchAsyncErrors(async (req, res) => {
  try {
    let grocery = await Grocery.find({
      $and: [{ superCategoryId: req.params.id }, { Offers: true }],
    });
    const supercategories = await superCategoryModel.find({ showProducts: true })
    let groceryfilter = []

    for (let index = 0; index < supercategories.length; index++) {
      let element = supercategories[index];
      let filterProducts = []
      filterProducts = grocery.filter((data) => data.superCategory === element.name)
      groceryfilter = [...groceryfilter, ...filterProducts]
    }

    let groceryfilteroutofstock = []

    for (let index = 0; index < groceryfilter.length; index++) {
      let element = groceryfilter[index];

      element.PackSizes = element.PackSizes.filter((pack) => pack.OutOfStack === false)
      groceryfilteroutofstock = [...groceryfilteroutofstock, element]
    }
    groceryfilteroutofstock = groceryfilteroutofstock.filter((data) => data.PackSizes.length !== 0)
    res.status(200).json({
      success: true,
      groceryCount: groceryfilteroutofstock.length,
      grocery: groceryfilteroutofstock,
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
