const mongoose = require("mongoose");

const categoryBannerSchema = mongoose.Schema({
  name: {
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
  category: {
    type: String,
    required: [true, "Please enter Category Name name"],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Require"],
    ref: "Category",
  },
  DeskImg: {
    type: String,
  },
  MblImg: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categorybanner", categoryBannerSchema);
