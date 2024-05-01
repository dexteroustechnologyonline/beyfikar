const express = require("express");
const {
  createBestOfferBanner,
  getAllBestOfferBanner,
  UpdateBestOfferBanner,
  DeleteBestOfferBanner,
  UploadDeskImage,
  UploadMobImage,
  UploadPosterImage
} = require("../controllers/bestOfferBannerController");

const router = express.Router();
router.route("/new").post(createBestOfferBanner);
router.route("/all").get(getAllBestOfferBanner);
router.route("/deskimages").post(UploadDeskImage);
router.route("/mobileimages").post(UploadMobImage);
router.route("/posterimages").post(UploadPosterImage);
router.route("/:id").put(UpdateBestOfferBanner);
router.route("/:id").delete(DeleteBestOfferBanner);

module.exports = router;
