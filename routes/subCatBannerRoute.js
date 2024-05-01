const express = require("express");
const {
  createSubCatBanner,
  getAllSubCatBanner,
  UpdateSubCatBanner,
  DeleteSubCatBanner,
  SubCatBannerUrlExist,
  UploadSubCatBannerDeskImage,
  UploadSubCatBannerMobImage,
  subcatBannerbyid,
  subcatBannerCatid,
  subcatBannerSubCatid,
} = require("../controllers/subCatBannerController");

const router = express.Router();
router.route("/new").post(createSubCatBanner);
router.route("/all").get(getAllSubCatBanner);
router.route("/url/:url").get(SubCatBannerUrlExist);
router.route("/sliderdeskimages").post(UploadSubCatBannerDeskImage);
router.route("/slidermobileimages").post(UploadSubCatBannerMobImage);
router.route("/subcatbannerbyid/:id").get(subcatBannerbyid);
router.route("/subcatbannerbycatid/:id").get(subcatBannerCatid);
router.route("/subcatbannerbysubcatid/:id").get(subcatBannerSubCatid);
router.route("updatesubcatbanner/:id").put(UpdateSubCatBanner);
router.route("deletesubcatbanner/:id").delete(DeleteSubCatBanner);

module.exports = router;
