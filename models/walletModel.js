const mongoose = require("mongoose");

const walletSchema = mongoose.Schema({
  ClientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
    required: true,
  },
  ClientName: {
    type: String,
    // required: true,
    default: ""
  },
  Mobile: {
    type: String,
    // required: true,
    default: ""
  },
  previousAmount: {
    type: Number,
    required: [true, "Please enter  previousAmount"],
  },
  availableAmount: {
    type: Number,
    required: [true, "Please provide availableAmount"],
    trim: true,
  },
  transactionAmount: {
    type: Number,
    required: [true, "Please provide transactionAmount"],
    trim: true,
  },
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    default: ""
  },
  Type: {
    type: String,
    default: ""
  },
  PaymentStatus: {
    type: String,
  },
  TxnId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wallet", walletSchema);
