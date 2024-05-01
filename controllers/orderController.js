const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
// const https = require("node-https");
const PaytmChecksum = require("../PaytmChechsum");
const { log } = require("console");
// const https = require('https');

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    let respo = ""
    let txnTokenResponce = ""
    // hashcode

    var paytmParams = {};
    let https;

    paytmParams.body = {
      requestType: "Payment",
      mid: "SHANTI03800179145316",
      websiteName: "WEBSTAGING",
      orderId: order._id,
      callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${order._id}`,
      txnAmount: {
        value: order.GrandTotal,
        currency: "INR",
      },
      userInfo: {
        custId: order.ClientId,
      },
    };
    let mychecksum = "";

    await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      "5uP5UMcOeaDg@aaY"
    ).then(async function (checksum) {
      mychecksum = checksum;
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);
      var options = {

        /* for Staging */
        // hostname: 'securegw.paytm.in',

        /* for Production */
        hostname: 'securegw.paytm.in',

        port: 443,
        path: `https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=SHANTI03800179145316&orderId=${order._id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
        }
      };

      try {
        https = require('node:https');
      } catch (err) {
        console.error('https support is disabled!');
      }
      var response = "";

      var post_req = https.request(options, async function (post_res) {
        await post_res.on('data', async function (chunk) {
          response += chunk;
        });

        await post_res.on('end', async function () {

          respo = JSON.parse(response);
          res.status(201).json({
            success: true,
            order,
            respo,
          });
        });
      });
      await post_req.write(post_data);
      await post_req.end();
    });



    //---need to be done


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







exports.createOrderForWebsite = catchAsyncErrors(async (req, res, next) => {
  try {

    const order = await Order.create(req.body);

    let respo = ""
    let txnTokenResponce = ""
    // hashcode

    var paytmParams = {};
    let https;

    paytmParams.body = {
      requestType: "Payment",
      mid: "SHANTI03800179145316",
      websiteName: "WEBSTAGING",
      orderId: order._id,
      callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${order._id}`,
      txnAmount: {
        value: order.GrandTotal,
        currency: "INR",
      },
      userInfo: {
        custId: order.ClientId,
      },
    };

    /* import checksum generation utility */
    const totalAmount = JSON.stringify(order.GrandTotal);

    var params = {};

    /* initialize an array */
    params['MID'] = "SHANTI03800179145316",
      params['WEBSITE'] = "WEBSTAGING",
      params['CHANNEL_ID'] = "WEB",
      params['INDUSTRY_TYPE_ID'] = "Retail",
      params['ORDER_ID'] = order._id,
      params['CUST_ID'] = order.ClientId,
      params['TXN_AMOUNT'] = totalAmount,
      params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
      params['EMAIL'] = "sharadsinha08@gmail.com",
      params['MOBILE_NO'] = '9876543210'

    /**
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    var paytmChecksum = PaytmChecksum.generateSignature(params, "5uP5UMcOeaDg@aaY");
    paytmChecksum.then(function (checksum) {
      let paytmParams = {
        ...params,
        "CHECKSUMHASH": checksum
      }
      res.json(paytmParams, order)

    }).catch(function (error) {
      console.log(error);
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
exports.generateNewTokenIdForWebSite = catchAsyncErrors(async (req, res, next) => {
  try {

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(200).json({
        success: false,
        message: "order not found",
      });
    }

    let respo = ""
    let txnTokenResponce = ""
    // hashcode

    var paytmParams = {};
    let https;

    paytmParams.body = {
      requestType: "Payment",
      mid: "SHANTI03800179145316",
      websiteName: "WEBSTAGING",
      orderId: order._id,
      callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${order._id}`,
      txnAmount: {
        value: order.GrandTotal,
        currency: "INR",
      },
      userInfo: {
        custId: order.ClientId,
      },
    };

    /* import checksum generation utility */
    const totalAmount = JSON.stringify(order.GrandTotal);

    var params = {};

    /* initialize an array */
    params['MID'] = "SHANTI03800179145316",
      params['WEBSITE'] = "WEBSTAGING",
      params['CHANNEL_ID'] = "WEB",
      params['INDUSTRY_TYPE_ID'] = "Retail",
      params['ORDER_ID'] = order._id,
      params['CUST_ID'] = order.ClientId,
      params['TXN_AMOUNT'] = totalAmount,
      params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
      params['EMAIL'] = "sharadsinha08@gmail.com",
      params['MOBILE_NO'] = '9876543210'

    /**
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */

    var paytmChecksum = PaytmChecksum.generateSignature(params, "5uP5UMcOeaDg@aaY");
    paytmChecksum.then(function (checksum) {
      let paytmParams = {
        ...params,
        "CHECKSUMHASH": checksum
      }

      res.json(paytmParams, order)

    }).catch(function (error) {
      console.log(error);
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

exports.callbackUrl = catchAsyncErrors(async (req, res, next) => {


});

exports.getAllOrder = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders: orders,
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
exports.getOrderRecieved = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 1 });
    res.status(200).json({
      success: true,
      orders: orders,
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
exports.getOrderProcessing = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 2 });
    res.status(200).json({
      success: true,
      orders: orders,
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
exports.getOrderDispatched = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 3 });
    res.status(200).json({
      success: true,
      orders: orders,
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
exports.getOrderOutforDelivery = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 4 });
    res.status(200).json({
      success: true,
      orders: orders,
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
exports.getOrderOutforDeliveryByDeliveryman = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 4, "Delivery.DMobile": req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders,
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
exports.getOrderDeliveriedByDeliveryman = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 5, "Delivery.DMobile": req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders,
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
exports.getOrderCancelledByDeliveryman = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 0, "Delivery.DMobile": req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders,
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
exports.getOrderDelivered = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 5 });
    res.status(200).json({
      success: true,
      orders: orders,
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
exports.getOrderDeliveredByLimit = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 5 })
      .sort({ createdAt: -1 })
      .limit(50);
    ;
    res.status(200).json({
      success: true,
      orders: orders,
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

exports.getOrderCancelled = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await Order.find({ Status: 0 });
    res.status(200).json({
      success: true,
      orders: orders,
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

exports.UpdateSingleOrdereitem = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.body.Id);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Grocery not found",
      });
    }

    order.DeliveryCharge = req.body.DeliveryCharge;
    order.GrandTotal = req.body.GrandTotal;
    order.ProductCount = req.body.ProductCount;
    order.Saving = req.body.Saving;

    order.OrderProducts = order.OrderProducts.map((ordr) => {
      if (String(ordr._id) === req.body.itemId) {
        ordr.Qty = req.body.Qty;
        ordr.TotalAmount = req.body.TotalAmount;
        ordr.TotalPrice = req.body.TotalPrice;
      }
      return ordr;
    });

    order = await Order.findByIdAndUpdate(req.body.Id, order, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      order: order,
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

exports.UpdateOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "order not found",
      });
    }
    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      order: order,
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

exports.OrderByClientId = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.find({ ClientId: req.params.id });
    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
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

exports.OrdergetLast10 = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.find({ ClientId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(10);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
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
exports.GetSingleOrderbyId = catchAsyncErrors(async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order: order,
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

