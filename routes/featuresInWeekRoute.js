const express = require("express");
const {
  createFeaturedInWeek,
  getAllFeaturedInWeek,
  UpdateFeaturedInWeek,
  DeleteFeaturedInWeek,
  UploadDeskImage,
  UploadMobImage,
  UploadPosterImage
} = require("../controllers/featuresInWeekController");

const router = express.Router();
router.route("/new").post(createFeaturedInWeek);
router.route("/all").get(getAllFeaturedInWeek);
router.route("/deskimages").post(UploadDeskImage);
router.route("/mobileimages").post(UploadMobImage);
router.route("/posterimages").post(UploadPosterImage);
router.route("/:id").put(UpdateFeaturedInWeek);
router.route("/:id").delete(DeleteFeaturedInWeek);

module.exports = router;
