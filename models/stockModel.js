const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  Category: {
    type: String,
  },
  CatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Required"],
    ref: "Category",
  },
  SubCat: {
    type: String,
    required: [true, "Please enter Sub-Category"],
  },
  SubCatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Required"],
    ref: "Subcategory",
  },
  ProductId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "product Id Required"],
    ref: "Grocery",
  },
  ProductName: {
    type: String,
    required: true,
  },
  PackSizeId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "product Id Required"],
    ref: "Grocery",
  },
  PackSize: {
    type: String,
    required: true,
  },
  Stock: {
    type: Number,
  },
  ExpiryDate: {
    type: String,
  },
  BatchNumber: {
    type: String,
  },
  ScannerCode: {
    type: String,
  },
  StockToDispatch: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stock", stockSchema);
