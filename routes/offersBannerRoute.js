const express = require("express");
const {
  createofferbanner,
  getAllofferbanner,
  Updateofferbanner,
  Deleteofferbanner,
  UploadofferbannerDeskImage,
  UploadofferbannerMobImage,
} = require("../controllers/offersBannerController");

const router = express.Router();
router.route("/new").post(createofferbanner);
router.route("/all").get(getAllofferbanner);
router.route("/offersbannerdeskimages").post(UploadofferbannerDeskImage);
router.route("/offersbannermobileimages").post(UploadofferbannerMobImage);

router.route("/:offersbannerid").put(Updateofferbanner);
router.route("/:deloffersbannerid").delete(Deleteofferbanner);

module.exports = router;
