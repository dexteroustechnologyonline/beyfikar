const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter  category name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Supercategory",
  },

  superCategory: {
    type: String,
  },
  mobileImage: {
    type: String,
    required: [true, "Please provide mobileImage"],
  },

  desktopImage: {
    type: String,
    required: [true, "Please provide desktopImage"],
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

module.exports = mongoose.model("Brand", brandSchema);
