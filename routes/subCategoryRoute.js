const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
  UpdateSubCategory,
  DeleteSubCategory,
  SubCatSlugUrlExist,
  UploadSubCategoryImage,
  subcategorybycatid,
  subcatbyid,
  subcatbyslugurl,
  getAllSubCategoryAdmin
} = require("../controllers/subCategoryController");

const router = express.Router();
router.route("/new").post(createSubCategory);
router.route("/all").get(getAllSubCategory);
router.route("/adminall").get(getAllSubCategoryAdmin);

router.route("/slugurl/:slugurl").get(SubCatSlugUrlExist);
router.route("/subcatbyid/:id").get(subcatbyid);
router.route("/subcatbyurl/:url").get(subcatbyslugurl);

router.route("/subcategoryimages").post(UploadSubCategoryImage);
router.route("/subcategoryid/:id").get(subcategorybycatid);
router.route("/:id").put(UpdateSubCategory);
router.route("/:id").delete(DeleteSubCategory);
module.exports = router;
