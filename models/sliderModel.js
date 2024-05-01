const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  URL: {
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
  Category: {
    type: String,
  },
  CatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Required"],
    ref: "Category",
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

module.exports = mongoose.model("Slider", sliderSchema);
