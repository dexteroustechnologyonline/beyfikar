const express = require("express");
const {
  createUniversalTag,
  getAllUniversalTag,
  UpdateUniversalTag,
  DeleteUniversalTag,
  UploadUniTagDeskImage,
  UploadUniTagMobImage,
  Universaltagbyid,
} = require("../controllers/universatTagController");

const router = express.Router();
router.route("/new").post(createUniversalTag);
router.route("/all").get(getAllUniversalTag);
router.route("/unitagdeskimages").post(UploadUniTagDeskImage);
router.route("/unitagmobileimages").post(UploadUniTagMobImage);
router.route("/universaltagbyid/:id").get(Universaltagbyid);
router.route("/updateunitag/:id").put(UpdateUniversalTag);
router.route("/deleteunitag/:id").delete(DeleteUniversalTag);

module.exports = router;
