const Wallet = require("../models/walletModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const PaytmChecksum = require("../PaytmChechsum");

exports.createWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.create(req.body);

    let respo = ""
    let txnTokenResponce = ""
    // hashcode

    var paytmParams = {};
    let https;

    paytmParams.body = {
      requestType: "Payment",
      mid: "SHANTI03800179145316",
      websiteName: "WEBSTAGING",
      orderId: wallet._id,
      callbackUrl: `https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=${wallet._id}`,
      txnAmount: {
        value: wallet.transactionAmount,
        currency: "INR",
      },
      userInfo: {
        custId: wallet.ClientId,
      },
    };

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
        path: `https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=SHANTI03800179145316&orderId=${wallet._id}`,
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
            wallet,
            respo,
          });
        });
      });
      await post_req.write(post_data);
      await post_req.end();
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

exports.getAllWallet = catchAsyncErrors(async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.status(200).json({
      success: true,
      wallets,
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

exports.WalletByClientId = catchAsyncErrors(async (req, res, next) => {
  try {
    let wallet = await Wallet.find({ ClientId: req.params.id });
    if (!wallet) {
      return res.status(500).json({
        success: false,
        message: "wallet not found",
      });
    }
    res.status(200).json({
      success: true,
      wallet: wallet,
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

exports.DeleteWallet = catchAsyncErrors(async (req, res, next) => {
  try {
    let wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return res.status(500).json({
        success: false,
        message: "wallet not found",
      });
    }
    await wallet.remove();
    res.status(200).json({
      success: true,
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

exports.UpdateWalletAll = catchAsyncErrors(async (req, res, next) => {
  try {
    const walletAll = await Wallet.find();
    var date = new Date();
    date.setDate(date.getDate());
    for (let i = 0; i < walletAll.length; i++) {
      let wallet = walletAll[i];
      const groceryid = wallet._id;
      wallet.Type = "";
      wallet.ClientName = "";
      wallet.Mobile = "";
      wallet.createdAt = date;

      wallet = await Wallet.findByIdAndUpdate(groceryid, wallet, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
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
