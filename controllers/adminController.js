
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Admin = require("../models/adminModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.createAdmin= async (req, res, next)=>{
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({
      success:true, 
      admin
  });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
}
exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  const name = admin.name;
    const isPasswordMatched = await admin.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    res.status(201).json({
      success:true,
      name, email, password 
      
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }   
  });

  exports.loginAdminwithpassword = catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
   
      // checking if user has given password and email both
    
      if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
      }
    
      const admin = await Admin.findOne({ email }).select("+password");
      
      const name = admin.name;
      const adminid = admin._id;
      const mobile = admin.mobile;
      const role = admin.role;
      if (!admin) {
        return next(new ErrorHander("Invalid email or password", 401));
      }
      const isPasswordMatched = await admin.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
      }
      res.status(201).json({
        success:true,
        name,
        adminid,
        mobile,
        email,
        role,
        admin
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error:error
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error:error
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error:error
      });
    }
  });

  exports.UpdateSuperCategory = catchAsyncErrors(async (req, res, next) => {
    try {
      let admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(500).json({
          success: false,
          message: "admin not found",
        });
      }
      admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        admin: admin,
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        massage: error._message,
        error: error
      });
      res.status(400).json({
        success: false,
        massage: error._message,
        error: error
      });
      res.status(500).json({
        success: false,
        massage: error._message,
        error: error
      });
    }
  });

  exports.mobileExist = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let admin = await Admin.findOne({ mobile: req.params.mobile,  });
  
      if (!admin) {
        return res.status(500).json({
          success: false,
          message: "new Mobile",
        });
      } 
  
      return res.status(200).json({
        success: true,
        message: " Mobile Number already exist",
      });
      } catch (error) {
        res.status(501).json({
            success: false,
            massage: error._message,
            error:error
          });
          res.status(400).json({
            success: false,
            massage: error._message,
            error:error
          });
          res.status(500).json({
            success: false,
            massage: error._message,
            error:error
          });
      }
    });
  
  exports.emailExist = catchAsyncErrors(
    async (req, res, next) => {
      try {
        let admin = await Admin.findOne({ email: req.params.email,  });
  
      if (!admin) {
        return res.status(500).json({
          success: false,
          message: "new email",
        });
      } 
  
      return res.status(200).json({
        success: true,
        message: " email already exist",
      });
      } catch (error) {
        res.status(501).json({
            success: false,
            massage: error._message,
            error:error
          });
          res.status(400).json({
            success: false,
            massage: error._message,
            error:error
          });
          res.status(500).json({
            success: false,
            massage: error._message,
            error:error
          });
      }
  });

