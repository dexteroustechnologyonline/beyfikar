const express = require("express");
const {
  createInFocusToday,
  getAllInFocusToday,
  UpdateInFocusToday,
  DeleteInFocusToday,
  UploadDeskImage,
  UploadMobImage,
  UploadPosterImage
} = require("../controllers/inFocusTodayController");

const router = express.Router();
router.route("/new").post(createInFocusToday);
router.route("/all").get(getAllInFocusToday);
router.route("/deskimages").post(UploadDeskImage);
router.route("/mobileimages").post(UploadMobImage);
router.route("/posterimages").post(UploadPosterImage);
router.route("/:id").put(UpdateInFocusToday);
router.route("/:id").delete(DeleteInFocusToday);

module.exports = router;
