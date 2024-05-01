const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Sub Category name"],
    // unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    // unique: [true, "slugUrl already exist"],
    trim: true,
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Supercategoryid Required"],
    ref: "Supercategory",
  },
  superCategory: {
    type: String,
    required: [true, "Please enter Category"],
  },
  category: {
    type: String,
    required: [true, "Please enter Category Name name"],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },
  metaTitle: {
    type: String,
    default: "",
    trim: true,
  },
  metaKeyword: {
    type: String,
    default: "",
    trim: true,
  },
  metaDesc: {
    type: String,
    default: "",
    trim: true,
  },
  mobileImage: {
    type: String,
    required: [true, "Please provide mobileImage"],
  },

  desktopImage: {
    type: String,
    required: [true, "Please provide desktopImage"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    default: "22",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Subcategory", subCategorySchema);
