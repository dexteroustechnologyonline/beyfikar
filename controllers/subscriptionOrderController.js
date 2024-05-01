const Subscriptionorder = require("../models/subscriptionOrderModel");
const Client = require("../models/clientModel");
const SubscriptionTakenorder = require("../models/subscriptionTakenOrdersModel");
const Wallet = require("../models/walletModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const moment = require('moment');


exports.createSubscriptionOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const subscriptionorder = await Subscriptionorder.create(req.body);
    res.status(201).json({
      success: true,
      subscriptionorder,
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
exports.GenerateSubscriptionOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    let clients = await Client.find({ VipStatus: true }).distinct(
      "_id"
    );
    let subscriptionTakenorders = await SubscriptionTakenorder.find();


    if (subscriptionTakenorders) {
      let orderGet = [];
      for (let i = 0; i < subscriptionTakenorders.length; i++) {

        for (let j = 0; j < clients.length; j++) {
          if (String(subscriptionTakenorders[i].ClientId) === String(clients[j])) {
            let sortarray = []
            sortarray = [...sortarray, subscriptionTakenorders[i]]
            orderGet = [...orderGet, ...sortarray];
          }
        }
      }


      let orderCreate = [];
      if (orderGet.length > 0) {

        let eligibleOrders = orderGet

        orderCreate = [...orderCreate]

        let todayOrder = new Date();
        todayOrder = todayOrder.setDate(todayOrder.getDate() + 2);
        // todayOrder = moment(todayOrder).format("YYYY-MM-DD");

        for (let i = 0; i < eligibleOrders.length; i++) {
          let element = eligibleOrders[i].orderDates;

          for (let j = 0; j < element.length; j++) {
            let dates = element[j];
            if (String(dates) == String(todayOrder)) {
              try {

                let geClient = await Client.findById(eligibleOrders[i].ClientId);

                if (geClient) {

                  let loginDetails = geClient;
                  const clientWalletMoney = loginDetails.WalletBalance;
                  const Orderproduct = eligibleOrders[i];
                  let orderMoney =
                    Number(Orderproduct.OrderProducts.Price) *
                    Number(Orderproduct.OrderProducts.Qty);

                  if (clientWalletMoney >= orderMoney) {

                    const userUpdateForm = {
                      claintid: loginDetails._id,
                      WalletBalance:
                        Number(loginDetails.WalletBalance) - Number(orderMoney),
                    };
                    const updateClient = await Client.findByIdAndUpdate(userUpdateForm.claintid, userUpdateForm, {
                      new: true,
                      useFindAndModify: false,
                      runValidators: true,
                    });
                    if (updateClient) {

                      const orderData = eligibleOrders[i];
                      const orderMoney =
                        Number(Orderproduct.OrderProducts.Price) *
                        Number(Orderproduct.OrderProducts.Qty);

                      const orderForm = {
                        ClientId: orderData.ClientId,
                        ClientName: orderData.ClientName,
                        GrandTotal: orderMoney,
                        TotalAmount: orderMoney,
                        Email: orderData.Email,
                        Address: orderData.Address,
                        AreaName: orderData.AreaName,
                        Mobile: orderData.Mobile,
                        PaymentStatus: "COD",
                        PaymentMode: "COD",
                        TxnId: "NA",
                        CurrentStatus: "Paid",
                        ProductCount: 1,
                        Saving:
                          Number(Orderproduct.OrderProducts.TotalMrp) -
                          Number(Orderproduct.OrderProducts.TotalPrice),
                        OrderProducts: [orderData.OrderProducts],
                      };

                      const subscriptionorder = await Subscriptionorder.create(orderForm);


                      if (subscriptionorder) {

                        const orderCurrent = subscriptionorder;

                        const walletForm = {
                          ClientId: loginDetails._id,
                          previousAmount: loginDetails.WalletBalance,
                          availableAmount:
                            loginDetails.WalletBalance - orderMoney,
                          transactionAmount: orderMoney * -1,
                          orderId: orderCurrent._id,
                          Type: "Wallet debit on New Order",
                          ClientName: loginDetails.Name,
                          Mobile: loginDetails.Mobile,
                        };
                        const wallet = await Wallet.create(walletForm);

                        orderCreate = [...orderCreate, orderCurrent];
                      }
                    } else {
                      const orderData = eligibleOrders[i];
                      const orderMoney =
                        Number(Orderproduct.OrderProducts.Price) *
                        Number(Orderproduct.OrderProducts.Qty);

                      const orderForm = {
                        ClientId: orderData.ClientId,
                        ClientName: orderData.ClientName,
                        GrandTotal: orderMoney,
                        TotalAmount: orderMoney,
                        Email: orderData.Email,
                        Address: orderData.Address,
                        AreaName: orderData.AreaName,
                        Mobile: orderData.Mobile,
                        PaymentStatus: "COD",
                        PaymentMode: "COD",
                        TxnId: "NA",
                        CurrentStatus: "Not Paid",
                        Status: 0,
                        StatusText: "Order Cancelled",
                        Saving:
                          Number(Orderproduct.OrderProducts.TotalMrp) -
                          Number(Orderproduct.OrderProducts.TotalPrice),
                        OrderProducts: [orderData.OrderProducts],
                      };

                      const subscriptionorder = await Subscriptionorder.create(orderForm);
                      orderCreate = [...orderCreate, subscriptionorder];
                    }

                  }
                }
              } catch (error) { }
            }
          }
        }
      }

      res.status(201).json({
        success: true,
        orderCreate,
      });

    }



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

exports.getAllSubscriptionOrder = catchAsyncErrors(async (req, res) => {
  try {
    const subscriptionorders = await Subscriptionorder.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      subscriptionorders: subscriptionorders,
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
exports.getTodayGeneratedSubscriptionOrder = catchAsyncErrors(async (req, res) => {
  try {
    let currentDate = new Date()
    currentDate = moment(currentDate).format("MMM DD, YYYY")
    const subscriptionorders = await Subscriptionorder.find({ createdAt: { $gte: new Date(currentDate) } }).sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: subscriptionorders.length,
      subscriptionorders: subscriptionorders,
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

exports.updateSubscriptionOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    let subscriptionorder = await Subscriptionorder.findById(req.params.id);
    if (!subscriptionorder) {
      return res.status(500).json({
        success: false,
        message: "subscriptionorder not found",
      });
    }
    subscriptionorder = await Subscriptionorder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      subscriptionorder: subscriptionorder,
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

exports.subscriptionOrderByClientId = catchAsyncErrors(async (req, res, next) => {
  try {
    let subscriptionorder = await Subscriptionorder.find({
      ClientId: req.params.id,
    });
    if (!subscriptionorder) {
      return res.status(500).json({
        success: false,
        message: "subscriptionorder not found",
      });
    }
    res.status(200).json({
      success: true,
      subscriptionorder: subscriptionorder,
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
exports.subscriptionOrderById = catchAsyncErrors(async (req, res, next) => {
  try {
    let subscriptionorder = await Subscriptionorder.findById(req.params.id);
    if (!subscriptionorder) {
      return res.status(200).json({
        success: false,
        message: "subscriptionorder not found",
      });
    }
    res.status(200).json({
      success: true,
      subscriptionorder: subscriptionorder,
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