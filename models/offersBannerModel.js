const mongoose = require("mongoose");

const offersBannerSchema = mongoose.Schema({
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

module.exports = mongoose.model("Offersbanner", offersBannerSchema);
