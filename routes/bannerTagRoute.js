const express = require("express");
const {
  createBannertag,
  getAllBannertag,
  UpdateBannertag,
  DeleteBannertag,
  UploadBannertagDeskImage,
  UploadBannertagMobImage,
  Bannertagbyid,
} = require("../controllers/bannerTagController");

const router = express.Router();
router.route("/new").post(createBannertag);
router.route("/all").get(getAllBannertag);
router.route("/bannerdeskimages").post(UploadBannertagDeskImage);
router.route("/bannermobileimages").post(UploadBannertagMobImage);
router.route("/bannertagbyid/:id").get(Bannertagbyid);
router.route("/updatebannertag/:id").put(UpdateBannertag);
router.route("/deletebannertag/:id").delete(DeleteBannertag);

module.exports = router;
