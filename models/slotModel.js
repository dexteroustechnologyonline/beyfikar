const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  SlotCount: {
    type: Number,
  },
  Date: Date,
  Value: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Slot", slotSchema);
