const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  Dname: {
    type: String,
  },
  Daddress: {
    type: String,
  },
  Dmobile: {
    type: String,
  },
  Daddressproof: {
    type: String,
  },
  Dpassword: {
    type: String,
  },
  DeliveryBoy: {
    type: Boolean,
    default: false,
  },
  StoreKeeper: {
    type: Boolean,
    default: false,
  },
  StoreManager: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
