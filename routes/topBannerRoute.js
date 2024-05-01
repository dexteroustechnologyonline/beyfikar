const express = require("express");
const {
  createTopBanner,
  getAllTopBanner,
  UpdateTopBanner,
  DeleteTopBanner,
  UploadDeskImage,
  UploadMobImage,
  UploadPosterImage
} = require("../controllers/topBannerController");

const router = express.Router();
router.route("/new").post(createTopBanner);
router.route("/all").get(getAllTopBanner);
router.route("/deskimages").post(UploadDeskImage);
router.route("/mobileimages").post(UploadMobImage);
router.route("/posterimages").post(UploadPosterImage);
router.route("/:id").put(UpdateTopBanner);
router.route("/:id").delete(DeleteTopBanner);

module.exports = router;
