const mongoose = require("mongoose");

const UniversalTagSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Universal Tag name"],
    unique: [true, "name already exist"],
    trim: true,
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

module.exports = mongoose.model("Universaltag", UniversalTagSchema);
