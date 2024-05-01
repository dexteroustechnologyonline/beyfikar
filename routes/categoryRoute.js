const express = require("express");
const {
  createCategory,
  getAllCategory,
  UpdateCategory,
  DeleteCategory,
  SlugUrlExist,
  UploadDesktopImage,
  UploadMobileImage,
  UploadCategoryImage,
  categorybyid,
  Categorybysupercatid,
} = require("../controllers/categoryController");

const router = express.Router();
router.route("/new").post(createCategory);
router.route("/all").get(getAllCategory);

router.route("/slugurl/:slugurl").get(SlugUrlExist);

router.route("/desktopimage").post(UploadDesktopImage);
router.route("/mobileimage").post(UploadMobileImage);
router.route("/categoryimages").post(UploadCategoryImage);
router.route("/categorybyid/:id").get(categorybyid);
router.route("/categorybysupercatid/:id").get(Categorybysupercatid);
router.route("/:id").put(UpdateCategory);
router.route("/:id").delete(DeleteCategory);

module.exports = router;
