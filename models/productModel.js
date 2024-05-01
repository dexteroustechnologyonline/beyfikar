const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    unique: [true, "name already exist"],
    trim: true,
  },
  slugUrl: {
    type: String,
    required: [true, "Please provide slugurl"],
    unique: [true, "slugUrl already exist"],
    trim: true,
  },
  superCategory: {
    type: String,
    required: [true, "Please enter supercategory name"],
  },

  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "supercategoryid Required"],
    ref: "Supercategory",
  },

  category: {
    type: String,
    required: [true, "Please enter Category Name "],
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id Required"],
    ref: "Category",
  },
  subCategory: {
    type: String,
    required: [true, "Please enter subCategory name"],
  },
  subCategoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "subCategoryId Required"],
    ref: "Subcategory",
  },
  brand: {
    type: String,
    required: [true, "Please enter brand name"],
  },

  about: {
    type: String,
  },
  ingredient: {
    type: String,
  },
  productInfo: {
    type: String,
  },
  details: {
    type: String,
  },
  design: {
    type: String,
  },
  material: {
    type: String,
  },
  rating: {
    type: Number,
  },

  dealoftheday: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  outOfStock: {
    type: Boolean,
    default: false,
  },
  offers: {
    type: Boolean,
    default: false,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
  multi: {
    type: Boolean,
    default: false,
    //more than one pack size then true else false
  },
  caskBack: {
    type: Boolean,
    default: false,
  },

  options: [
    {
      optionName: {
        type: String,
        required: [true, "Please provide optionName"],
      },
      skuCode: String,
      barcode: String,
      color: [
        {
          type: String,
        },
      ],
      sizes: {
        S: {
          type: Boolean,
          default: false,
        },
        M: {
          type: Boolean,
          default: false,
        },
        L: {
          type: Boolean,
          default: false,
        },
        XL: {
          type: Boolean,
          default: false,
        },
        XXL: {
          type: Boolean,
          default: false,
        },
        XXXL: {
          type: Boolean,
          default: false,
        },
        XXXXL: {
          type: Boolean,
          default: false,
        },
      },
      varient: [
        {
          varientName: {
            type: String,
            required: [true, "Please provide varientName"],
          },
          varientSpecifications: [
            {
              vspName: String,
              vspDetails: String,
            },
          ],
        },
      ],
      specifications: [
        {
          spName: String,
          spDetails: String,
        },
      ],

      mobileImage: {
        type: String,
        required: [true, "Please provide mobileImage"],
      },
      desktopImage: {
        type: String,
        required: [true, "Please provide desktopImage"],
      },

      costPrice: {
        type: Number,
        default: 0,
      },
      gstCost: {
        type: Number,
        required: [true, "Please provide gstCost"],
        default: 0,
      },
      sellingPrice: {
        type: Number,
        required: [true, "Please provide sellingPrice"],
      },
      gstSellPrice: {
        type: Number,
        required: [true, "Please provide gstSellPrice"],
        default: 0,
      },
      mrp: {
        type: Number,
        required: [true, "Please provide mrp"],
      },
      discounts: {
        type: Number,
        // required: [true, "Please provide discounts"],
      },
    },
  ],
  metaTitle: {
    type: String,
    default: "",
  },
  metaKeyword: {
    type: String,
    default: "",
    trim: true,
  },
  metaDesc: {
    type: String,
    default: "",
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
