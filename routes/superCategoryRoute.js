const express = require("express");
const {
  createSuperCategory,
  getAllSuperCategory,
  UpdateSuperCategory,
  DeleteSuperCategory,
  SlugUrlExist,
  supercategorybyid,
  getUpdateAllSuperCategory,
} = require("../controllers/superCategoryController");

const router = express.Router();
router.route("/new").post(createSuperCategory);
router.route("/all").get(getAllSuperCategory);
router.route("/updateall").get(getUpdateAllSuperCategory);
router.route("/supercategorybyid/:id").get(supercategorybyid);
router.route("/slugurl/:slugurl").get(SlugUrlExist);
router.route("/:id").put(UpdateSuperCategory);
router.route("/:id").delete(DeleteSuperCategory);

module.exports = router;
