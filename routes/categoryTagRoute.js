const express = require("express");
const {
  createCategoryTag,
  getAllCategoryTag,
  UpdateCategoryTag,
  DeleteCategoryTag,
  UploadCategoryTagDeskImage,
  UploadCategoryTagMobImage,
  Categorytagbyid,
  Categorytagbysupercatid,
  Categorytagbycatid,
} = require("../controllers/categoryTagController");

const router = express.Router();
router.route("/new").post(createCategoryTag);
router.route("/all").get(getAllCategoryTag);
router.route("/cattagdeskimages").post(UploadCategoryTagDeskImage);
router.route("/cattagmobileimages").post(UploadCategoryTagMobImage);
router.route("/categorytagbyid/:id").get(Categorytagbyid);
router.route("/categorytagbysupercatid/:id").get(Categorytagbysupercatid);
router.route("/categorytagbycatid/:id").get(Categorytagbycatid);
router.route("/updatecattag/:id").put(UpdateCategoryTag);
router.route("/deletecattag/:id").delete(DeleteCategoryTag);

module.exports = router;
