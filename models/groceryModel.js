const mongoose = require("mongoose");

const groceySchema = mongoose.Schema({
  ItemName: {
    type: String,
  },
  Url: {
    type: String,
    required: [true, "Please provide Url"],
    unique: [true, "Url already exist"],
    trim: true,
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Supercategory",
  },

  superCategory: {
    type: String,
  },
  Category: {
    type: String,
  },
  CatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Required"],
    ref: "Category",
  },
  SubCat: {
    type: String,
    required: [true, "Please enter Sub-Category"],
  },
  SubCatId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Required"],
    ref: "Subcategory",
  },
  KeyWords: {
    type: String,
    default: "",
  },
  Description: {
    type: String,
    default: "",
  },
  Title: {
    type: String,
  },

  About: {
    type: String,
  },
  Ingredient: {
    type: String,
  },
  ProductInfo: {
    type: String,
  },

  Type: {
    type: String,
  },
  Rating: {
    type: Number,
  },
  Brand: {
    type: String,
    required: [true, "Please enter brand name"],
  },
  Options: {
    type: String,
  },

  Recommends: {
    type: Boolean,
    default: false,
  },
  HotProducts: {
    type: Boolean,
    default: false,
  },
  Trending: {
    type: Boolean,
    default: false,
  },
  Offers: {
    type: Boolean,
    default: false,
  },
  Multi: {
    type: Boolean,
    default: false,
  },
  Single: {
    type: Boolean,
    default: false,
  },

  MainBannerOffer: {
    type: Boolean,
    default: false,
  },
  BestOffer: {
    type: Boolean,
    default: false,
  },
  TodayFeature: {
    type: Boolean,
    default: false,
  },

  InFocus: {
    type: Boolean,
    default: false,
  },
  FeaturesInWeek: {
    type: Boolean,
    default: false,
  },
  OutOfStack:{
    type: Boolean,
    default: false,
  },
  Cashback: {
    type: Boolean,
    default: false,
  },
  Pcb1: {
    type: Number,
    default: "1",
  },
  Pcb2: {
    type: Number,
    default: "2",
  },
  Pcb3: {
    type: Number,
    default: "3",
  },
  ProductId: {
    type: String,
  },

  PackSizes: [
    {
      PackSize: {
        type: String,
      },
      ImgUrlDeskTiles: {
        type: String,
      },
      ImgUrlMbl: {
        type: String,
        required: [true, "Please provide mobileImage"],
      },
      ImgUrlMblIcon: {
        type: String,
        required: [true, "Please provide mobileImage Icon"],
      },
      ImgUrlDesk: {
        type: String,
        required: [true, "Please provide desktopImage"],
      },
      ImgUrlDeskIcon: {
        type: String,
        required: [true, "Please provide desktopImage Icon"],
      },
      CostPrc: {
        type: Number,
        default: 0,
      },
      GstCost: {
        type: Number,
        default: 0,
      },
      SellingPrice: {
        type: Number,
        required: [true, "Please provide sellingPrice"],
      },
      GstSellPrc: {
        type: Number,
        default: 0,
      },
      Mrp: {
        type: Number,
        required: [true, "Please provide MRP"],
      },

      OutOfStack: {
        type: Boolean,
        default: false,
      },
      Pri: {
        type: Boolean,
        default: false,
      },
      StockAutoUpdate: {
        type: Boolean,
        default: false,
      },
      Discount: {
        type: Number,
        default: 0,
      },
      CartQuantity: {
        type: Number,
        default: 0,
      },
      maximumQuantity: {
        type: Number,
        default: 10,
      },
    },
  ],
  UniversalTag: String,
  CategoryTag: String,
  BannerTag: String, // ramadan, holi, christmus

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Grocery", groceySchema);
