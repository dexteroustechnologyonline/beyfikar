const mongoose = require("mongoose");

const walletTransactionSchema = mongoose.Schema({
  ClientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
    required: true,
  },
  OrderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
  cashback: {
    type: Number,
  },
  WalletBalance: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wallettransaction", walletTransactionSchema);
