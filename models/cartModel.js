const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    ClientId: {
        type: mongoose.Schema.ObjectId,
        ref: "Client",
        required: true,
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
            // superCategoryId: {
            //   type: mongoose.Schema.ObjectId,
            //   ref: "Supercategory",
            // },

            superCategory: {
                type: String,
            },
            CatId: {
                type: mongoose.Schema.ObjectId,
                required: [true, "Category Id Required"],
                ref: "Category",
            },
            // SubCat: {
            //   type: String,
            //   required: [true, "Please enter Sub-Category"],
            // },
            // SubCatId: {
            //   type: mongoose.Schema.ObjectId,
            //   required: [true, "subCategoryId Required"],
            //   ref: "Subcategory",
            // },
            packsizeId: {
                type: String,
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
            Status: {
                type: Boolean,
                default: true,
            },
            Cashback: {
                type: Boolean,
                default: false,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
