const express = require("express");
const {
  createToDaysFeatured,
  getAllToDaysFeatured,
  UpdateToDaysFeatured,
  DeleteToDaysFeatured,
  UploadDeskImage,
  UploadMobImage,
  UploadPosterImage
} = require("../controllers/toDaysFeatureController");

const router = express.Router();
router.route("/new").post(createToDaysFeatured);
router.route("/all").get(getAllToDaysFeatured);
router.route("/deskimages").post(UploadDeskImage);
router.route("/mobileimages").post(UploadMobImage);
router.route("/posterimages").post(UploadPosterImage);
router.route("/:id").put(UpdateToDaysFeatured);
router.route("/:id").delete(DeleteToDaysFeatured);

module.exports = router;
