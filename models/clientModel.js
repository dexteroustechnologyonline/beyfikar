const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  clientId: {
    type: String,
  },
  Email: {
    type: String,
    required: [true, "Please provide Url"],
    trim: true,
  },
  Mobile: {
    type: String,
  },
  Addresses: [
    {
      AName: {
        type: String,
      },
      Number: {
        type: String,
      },
      Pincode: {
        type: Number,
      },
      State: {
        type: String,
      },
      City: {
        type: String,
      },
      HNo: {
        type: String,
      },
      StreetDet: {
        type: String,
      },
      LandMark: {
        type: String,
      },
      AreaDet: {
        type: String,
      },

      Address: {
        type: String,
      },
      Type: {
        type: String,
        default: "Home",
      },
      Tag: {
        type: String,
      },
      prime: {
        type: Boolean,
        default: false,
      },
      Mobile: {
        type: String,
      },
    },
  ],
  WalletBalance: {
    type: Number,
    default: 0,
  },
  ReferCode: {
    type: String,
  },
  Block: {
    type: Boolean,
    default: false,
  },
  VipStatus: {
    type: Boolean,
    default: false,
  },
  VipStatusExpire: {
    type: Date,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", clientSchema);
