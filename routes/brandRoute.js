const express = require("express");
const {
  createBrand,
  getAllBrand,
  UpdateBrand,
  DeleteBrand,
  BrandSlugUrlExist,
  UploadBrandImage,
  brandbyid,
} = require("../controllers/brandController");

const router = express.Router();
router.route("/new").post(createBrand);
router.route("/all").get(getAllBrand);
router.route("/slugurl/:slugurl").get(BrandSlugUrlExist);
router.route("/brandimages").post(UploadBrandImage);
router.route("/brandbyid/:id").get(brandbyid);
router.route("/:id").put(UpdateBrand);
router.route("/:id").delete(DeleteBrand);

module.exports = router;
