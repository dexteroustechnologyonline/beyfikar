const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  UpdateCoupon,
  DeleteCoupon,
  Couponbyid,
} = require("../controllers/couponController");

const router = express.Router();
router.route("/new").post(createCoupon);
router.route("/all").get(getAllCoupon);
router.route("/couponbyid/:id").get(Couponbyid);
router.route("/:id").put(UpdateCoupon);
router.route("/:id").delete(DeleteCoupon);

module.exports = router;
