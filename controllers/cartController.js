const Cart = require("../models/cartModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



exports.createCart = async (req, res, next) => {
    try {

        let virifyCart = await Cart.findOne({ ClientId: req.body.ClientId, });

        if (!virifyCart) {
            const cart = await Cart.create(req.body);
            res.status(201).json({
                success: true,
                cart,
            });
        }

        virifyCart.OrderProducts = req.body.OrderProducts
        virifyCart = await Cart.findByIdAndUpdate(
            virifyCart._id,
            virifyCart,
            {
                new: true,
                useFindAndModify: false,
                runValidators: true,
            }
        );
        res.status(200).json({
            success: true,
            cart: virifyCart,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(400).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(500).json({
            success: false,
            massage: error._message,
            error: error,
        });
    }
};


exports.getAllCart = catchAsyncErrors(async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json({
            success: true,
            carts,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(400).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(500).json({
            success: false,
            massage: error._message,
            error: error,
        });
    }
});

exports.cartrByClientId = catchAsyncErrors(async (req, res, next) => {
    try {
        let cart = await Cart.find({ ClientId: req.params.id });
        if (!cart) {
            return res.status(200).json({
                success: false,
                message: "cart not found",
            });
        }
        res.status(200).json({
            success: true,
            cart: cart,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(400).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(500).json({
            success: false,
            massage: error._message,
            error: error,
        });
    }
});


exports.UpdateCart = catchAsyncErrors(async (req, res, next) => {
    try {
        let cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(200).json({
                success: false,
                message: "cart not found",
            });
        }
        cart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                useFindAndModify: false,
                runValidators: true,
            }
        );
        res.status(200).json({
            success: true,
            cart: cart,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(400).json({
            success: false,
            massage: error._message,
            error: error,
        });
        res.status(500).json({
            success: false,
            massage: error._message,
            error: error,
        });
    }
});