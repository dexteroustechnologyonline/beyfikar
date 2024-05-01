const mongoose = require("mongoose");

const subCatSliderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  URL: {
    type: String,
  },
  Category: {
    type: String,
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Supercategoryid Required"],
    ref: "Supercategory",
  },

  superCategory: {
    type: String,
    required: [true, "Please enter superCategory"],
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
  DeskImg: {
    type: String,
  },
  MblImg: {
    type: String,
  },
  show: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SubcategorySlider", subCatSliderSchema);
