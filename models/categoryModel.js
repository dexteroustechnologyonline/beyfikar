const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter  category name"],
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
    required: [true, "Please enter superCategory"],
  },
  mobileImage: {
    type: String,
    required: [true, "Please provide mobileImage"],
  },

  desktopImage: {
    type: String,
    required: [true, "Please provide desktopImage"],
  },
  metaTitle: {
    type: String,
    default: "",
  },
  metaKeyword: {
    type: String,
    default: "",
  },
  metaDesc: {
    type: String,
    default: "",
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

module.exports = mongoose.model("Category", categorySchema);
