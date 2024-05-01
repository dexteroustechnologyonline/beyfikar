const mongoose = require("mongoose");

const pinAmountSchema = mongoose.Schema({
  pincode: {
    type: String,
    required: [true, "Please enter  category name"],
    trim: true,
  },
  area: {
    type: String,
    required: [true, "Please enter  category name"],
    trim: true,
  },
  locality: {
    type: String,
    required: [true, "Please enter  category name"],
    trim: true,
  },
  sub_locality: {
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

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Pinamounttable", pinAmountSchema);
