const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({

  name: {
    type: String,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide Url"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },

  Category: {
    type: String,
  },
  CatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Required"],
    ref: "Category",
  },
  // SubCat: {
  //   type: String,
  //   required: [true, "Please enter Sub-Category"],
  // },
  // SubCatId: {
  //   type: mongoose.Schema.ObjectId,
  //   required: [true, "subCategoryId Required"],
  //   ref: "Subcategory",
  // },
  KeyWords: {
    type: String,
    default: "",
  },
  Description: {
    type: String,
    default: "",
  },
  Title: {
    type: String,
  },

  About: {
    type: String,
  },
  Ingredient: {
    type: String,
  },
  ProductInfo: {
    type: String,
  },

  Type: {
    type: String,
  },
  Brand: {
    type: String,
  },

  Cashback: {
    type: Boolean,
    default: false,
  },
  Pcb1: {
    type: Number,
    default: "1",
  },
  Pcb2: {
    type: Number,
    default: "2",
  },
  Pcb3: {
    type: Number,
    default: "3",
  },

  ItemName: {
    type: String,
  },
  ImgUrlMbl: {
    type: String,
    required: [true, "Please provide mobileImage"],
  },
  ImgUrlDesk: {
    type: String,
    required: [true, "Please provide desktopImage"],
  },
  CostPrc: {
    type: Number,
    default: 0,
  },
  GstCost: {
    type: Number,
    default: 0,
  },
  SellingPrice: {
    type: Number,
    required: [true, "Please provide sellingPrice"],
  },
  VipSellingPrice: {
    type: Number,
    // required: [true, "Please provide sellingPrice"],
  },
  GstSellPrc: {
    type: Number,
    default: 0,
  },
  Mrp: {
    type: Number,
    required: [true, "Please provide sellingPrice"],
  },
  OutOfStack: {
    type: Boolean,
    default: false,
  },

  StockAutoUpdate: {
    type: Boolean,
    default: false,
  },
  Discount: {
    type: Number,
    default: 0,
  },
  VipDiscount: {
    type: Number,
    default: 0,
  },
  CartQuantity: {
    type: Number,
    default: 0,
  },
  maximumQuantity: {
    type: Number,
    default: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
