const SubscriptionTakenorder = require("../models/subscriptionTakenOrdersModel");
const Client = require("../models/clientModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const Subscriptionorder = require("../models/subscriptionOrderModel");
const moment = require("moment");


exports.createSubscriptionTakenOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const subscriptionTakenorder = await SubscriptionTakenorder.create(req.body);
        res.status(201).json({
            success: true,
            subscriptionTakenorder,
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

exports.getAllSubscriptionTakenOrder = catchAsyncErrors(async (req, res) => {
    try {
        const subscriptionTakenorders = await SubscriptionTakenorder.find();

        res.status(200).json({
            success: true,
            subscriptionTakenorders: subscriptionTakenorders,
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

exports.updateSubscriptionTakenOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        let subscriptionTakenorder = await SubscriptionTakenorder.findById(req.params.id);
        if (!subscriptionTakenorder) {
            return res.status(500).json({
                success: false,
                message: "subscriptionTakenorder not found",
            });
        }
        subscriptionTakenorder = await SubscriptionTakenorder.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            subscriptionTakenorder: subscriptionTakenorder,
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

exports.subscriptionTakenOrderByClientId = catchAsyncErrors(async (req, res, next) => {
    try {
        let subscriptionTakenorder = await SubscriptionTakenorder.find({
            ClientId: req.params.id,
        });
        if (!subscriptionTakenorder) {
            return res.status(500).json({
                success: false,
                message: "subscriptionTakenorder not found",
            });
        }
        res.status(200).json({
            success: true,
            subscriptionTakenorder: subscriptionTakenorder,
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
exports.subscriptionOrderGeneration = catchAsyncErrors(async (req, res, next) => {
    try {
        const clients = await Client.find({ VipStatus: true }).distinct(
            "_id"
        );
        if (!clients) {
            return res.status(200).json({
                success: false,
                message: "clients not found",
            });
        }

        let ordercreate = []
        for (let j = 0; j < clients.length; j++) {
            ordercreate = [...ordercreate]
            let currentClientid = clients[j];
            let todayDate = new Date()
            todayDate = moment(todayDate).format("MMM DD, YYYY")


            let currentDate = new Date()
            const subscriptionTakenorders = await SubscriptionTakenorder.find({
                $and: [
                    { ClientId: currentClientid },
                    { "startDate": { $lte: new Date(currentDate) } },
                    { "endDate": { $gte: new Date(currentDate) } }
                ]
            });

            if (subscriptionTakenorders.length > 0) {
                // const subscriptionTakenorders = getsuborders.filter((order) => moment(order.startDate).format("MMM DD, YYYY") >= moment(currentDate).format("MMM DD, YYYY") && moment(order.endDate).format("MMM DD, YYYY") <= moment(currentDate).format("MMM DD, YYYY"))

                let totalPrice = 0
                let totalMrp = 0

                for (let index = 0; index < subscriptionTakenorders.length; index++) {
                    totalPrice = totalPrice + (subscriptionTakenorders[index].Price * subscriptionTakenorders[index].Qty);
                    totalMrp = totalMrp + (subscriptionTakenorders[index].Mrp * subscriptionTakenorders[index].Qty);
                }
                let orderDate = new Date();
                orderDate = orderDate.setDate(orderDate.getDate());
                if (subscriptionTakenorders.length > 0) {
                    const findtodayClientOrder = await Subscriptionorder.findOne({
                        $and: [
                            { ClientId: currentClientid },
                            { createdAt: { $gte: new Date(todayDate) } }
                        ]
                    })
                    if (!findtodayClientOrder) {
                        const orderFormData = {
                            ClientId: subscriptionTakenorders[0].ClientId,
                            ClientName: subscriptionTakenorders[0].ClientName,
                            TotalAmount: totalPrice,
                            Email: subscriptionTakenorders[0].Email,
                            DeliveryCharge: subscriptionTakenorders[0].DeliveryCharge,
                            GrandTotal: totalPrice,
                            Address: subscriptionTakenorders[0].Address,
                            Mobile: subscriptionTakenorders[0].Mobile,
                            DeliveredDate: orderDate,
                            OrderProducts: subscriptionTakenorders,
                        }
                        const subscriptionorder = await Subscriptionorder.create(orderFormData);
                        ordercreate = [...ordercreate, subscriptionorder]
                    }
                }

            }

        }
        res.status(200).json({
            success: true,
            count: ordercreate.length,
            ordercreate: ordercreate,
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