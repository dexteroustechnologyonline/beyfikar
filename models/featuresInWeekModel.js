const mongoose = require("mongoose");

const featuredInWeekSchema = mongoose.Schema({
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

  SubCat: {
    type: String,
    required: [true, "Please enter Sub-Category"],
  },
  SubCatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Required"],
    ref: "Subcategory",
  },

  MobilePoster: {
    type: String,
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

module.exports = mongoose.model("FeaturedInWeek", featuredInWeekSchema);
