const mongoose = require("mongoose");

const SubscriptionOrderSchema = mongoose.Schema({
  ClientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
    required: true,
  },
  ClientName: {
    type: String,
  },
  TotalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  Email: {
    type: String,
  },

  DeliveryCharge: {
    type: Number,
    default: 0,
  },
  GrandTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  Address: {
    type: String,
    required: true,
  },

  Mobile: {
    type: String,
    required: true,
  },

  DeliveredDate: {
    type: Date,
  },

  Status: {
    type: Number,
    default: 1,
  },
  StatusText: {
    type: String,
    default: "Order Recieved",
  },
  ProductCount: {
    type: Number,
  },

  Delivery: {
    DID: {
      type: mongoose.Schema.ObjectId,
      ref: "Employee",
    },
    DName: {
      type: String,
    },
    DMobile: {
      type: String,
    },
  },

  OrderProducts: [
    {
      ProductId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "product Id Required"],
        ref: "Grocery",
      },
      ProductName: {
        type: String,
        required: true,
      },

      CatId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Category Id Required"],
        ref: "Category",
      },
      CatName: {
        type: String,
        required: true,
      },
      Brand: {
        type: String,
        required: [true, "Please provide brand "],
        default: "Brand",
      },
      ItemName: {
        type: String,
        required: [true, "Please provide ItemName"],
      },
      PackSize: {
        type: String,
      },
      Description: {
        type: String,
      },
      ImgUrl: {
        type: String,
      },
      Price: {
        type: Number,
        required: true,
        default: 0,
      },
      Qty: {
        type: Number,
        required: true,
        default: 1,
      },
      TotalAmount: {
        type: Number,
        required: true,
        default: 0,
      },
      Mrp: {
        type: Number,
        required: true,
        default: 0,
      },
      TotalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      TotalMrp: {
        type: Number,
        required: true,
        default: 0,
      },
      Discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscriptionorder", SubscriptionOrderSchema);
