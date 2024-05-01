const mongoose = require("mongoose");

const CategoryTagSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Universal Tag name"],
    unique: [true, "name already exist"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categorytag", CategoryTagSchema);
