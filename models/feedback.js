const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  Name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  Service: {
    type: String,
  },
  Delivery: {
    type: String,
  },
  App: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
