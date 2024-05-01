const Client = require("../models/clientModel");
const DummyClient = require("../models/dummyClients");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { log } = require("console");

exports.createClient = async (req, res, next) => {
  try {

    let client = await Client.findOne({ Mobile: req.body.Mobile });
    if (!client) {
      client = await Client.create(req.body);
    }
    res.status(201).json({
      success: true,
      client,
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

exports.getAllClient = catchAsyncErrors(async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({
      success: true,
      clients,
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
exports.getAllSubscriptionActiveClient = catchAsyncErrors(async (req, res) => {
  try {
    const clients = await Client.find({ VipStatus: true }).distinct(
      "_id"
    );

    res.status(200).json({
      success: true,
      clients,
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

exports.mobileExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findOne({ Mobile: req.params.mobile });

    if (!client) {
      return res.status(500).json({
        success: false,
        message: "new mobile number",
      });
    }
    return res.status(200).json({
      success: true,
      message: " mobile number already exits",
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

exports.UpdateCLient = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(500).json({
        success: false,
        message: "client not found",
      });
    }
    client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      client: client,
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

exports.UpdateCLientAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findById(req.body.ClientId);
    if (!client) {
      return res.status(200).json({
        success: false,
        message: "client not found",
      });
    }
    let currentAddress =
      ", Phone Number : " +
      req.body.Number +
      ", State : " +
      req.body.State +
      ", City : " +
      req.body.City +
      ", Pincode : " +
      req.body.Pincode +
      ", House/ Flat No : " +
      req.body.HNo +
      ", LandMark: " +
      req.body.LandMark;

    req.body.Address = currentAddress;

    client.Addresses = [req.body, ...client.Addresses];

    client = await Client.findByIdAndUpdate(req.body.ClientId, client, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      client: client,
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

exports.UpdateClientSingleAddress = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let client = await Client.findById(req.body.ClientId);

      if (!client) {
        return res.status(500).json({
          success: false,
          message: "client not found",
        });
      }

      client.Addresses = client.Addresses.map((address) => {
        if (String(address._id) === req.body.addressId) {
          address.AName = req.body.AName;
          address.Number = req.body.Number;
          address.Pincode = req.body.Pincode;
          address.State = req.body.State;
          address.City = req.body.City;
          address.HNo = req.body.HNo;
          address.StreetDet = req.body.StreetDet;
          address.LandMark = req.body.LandMark;
          address.AreaDet = req.body.AreaDet;
          address.Address = req.body.Address;
          address.Type = req.body.Type;
          // address.Tag = req.body.Tag;
          address.prime = req.body.prime;
          address.Mobile = req.body.Mobile;
        }
        return address;
      });

      client = await Client.findByIdAndUpdate(req.body.ClientId, client, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        client: client,
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
  }
);
exports.DeleteClientSingleAddress = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let client = await Client.findById(req.body.ClientId);

      if (!client) {
        return res.status(500).json({
          success: false,
          message: "client not found",
        });
      }
      // client.Addresses = client.Addresses.map((address) => {
      //   if (String(address._id) === req.body.addressId) {
      //     address.remove();
      //   }
      //   return address;
      // });
      client.Addresses = client.Addresses.filter((addres) => String(addres._id) !== String(req.body.addressId))

      client = await Client.findByIdAndUpdate(req.body.ClientId, client, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        client: client,
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
  }
);

exports.AddclientAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findOne({ clientId: req.body.clientId });

    if (!client) {
      return res.status(500).json({
        success: false,
        message: "client not found",
      });
    }
    client.Addresses = [...client.Addresses, req.body];
    //  client.Addresses = [];

    client = await Client.findByIdAndUpdate(client._id, client, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      client: client,
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

exports.clientById = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(500).json({
        success: false,
        message: "client not found",
      });
    }
    res.status(200).json({
      success: true,
      client: client,
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

exports.DeleteClient = catchAsyncErrors(async (req, res, next) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(500).json({
        success: false,
        message: "client not found",
      });
    }
    await client.remove();
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

exports.loginClient = catchAsyncErrors(async (req, res, next) => {
  try {
    const client = await Client.findOne({ Mobile: req.body.Mobile });

    if (!client) {
      return res.status(200).json({
        success: false,
        message: "client not found",
      });
    }
    const mobile = client.Mobile;
    const clientid = client._id;

    res.status(200).json({
      success: true,
      clientid,
      mobile,
      client,
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


exports.updateAllClient = catchAsyncErrors(async (req, res) => {
  try {
    const clients = await Client.find();

    for (let index = 0; index < clients.length; index++) {
      let client = clients[index];
      client.Addresses = client.Addresses.map((addr) => {

        if (String(addr.AName) === "undefined") {
          addr.AName = ""
        }
        if (String(addr.City) === "undefined") {
          addr.City = "Jharkhand"
        }
        if (String(addr.LandMark) === "undefined") {
          addr.LandMark = String(addr.StreetDet)
        }
        // addr.LandMark = String(addr.StreetDet)

        if (String(addr.HNo) === "undefined") {
          addr.HNo = ""
        }
        if (String(addr.StreetDet) === "undefined") {
          addr.StreetDet = ""
        }
        if (String(addr.AreaDet) === "undefined") {
          addr.AreaDet = ""
        }
        if (String(addr.Tag) === "undefined") {
          addr.Tag = ""
        }


        return addr
      })

      client = await Client.findByIdAndUpdate(client._id, client, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });

    }
    res.status(200).json({
      success: true,
      clients,
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