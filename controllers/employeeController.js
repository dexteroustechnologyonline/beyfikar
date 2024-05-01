const Employee = require("../models/employeeModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      employee,
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

exports.getAllEmployee = catchAsyncErrors(async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      employees,
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
    let employee = await Employee.findOne({ Dmobile: req.params.mobile });
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "new mobile number",
      });
    }
    return res.status(200).json({
      success: true,
      employee: employee,
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

exports.UpdateEmployee = catchAsyncErrors(async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "employee not found",
      });
    }
    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      employee: employee,
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

exports.DeleteEmployee = catchAsyncErrors(async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(500).json({
        success: false,
        message: "Employee not found",
      });
    }
    await employee.remove();
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
