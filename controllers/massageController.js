const Massage = require("../models/MassageModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.createmessage = async (req, res, next) => {
    try {
        const massage = await Massage.create(req.body);
        res.status(201).json({
            success: true,
            massage,
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

exports.getMassage = catchAsyncErrors(async (req, res) => {
    try {
        const message = await Massage.findOne();
        res.status(200).json({
            success: true,
            message,
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


exports.UpdateMassage = catchAsyncErrors(async (req, res, next) => {
    try {
        let massage = await Massage.findById(req.params.id);
        if (!massage) {
            return res.status(500).json({
                success: false,
                message: "massage not found",
            });
        }
        massage = await Massage.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            massage: massage,
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


