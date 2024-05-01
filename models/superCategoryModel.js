
const mongoose = require("mongoose");

const superCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Super-Category name"],
      unique: [true, "name already exist"],
      trim: true
    },
    slugUrl: {
      type: String,
      required: [true, "Please provide slugurl"],
      unique: [true, "slugUrl already exist"],
      trim: true,
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
    showProducts: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  });


module.exports = mongoose.model("Supercategory", superCategorySchema);
