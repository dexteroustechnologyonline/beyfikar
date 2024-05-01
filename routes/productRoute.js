const express = require("express");
const {
    createProduct,
    getAllProduct,
    UpdateProduct,
    DeleteProduct,
    SlugUrlExist,
    UploadProductImage,
    filterSlugurl
} = require("../controllers/productController");

const router = express.Router();
router.route("/new").post(createProduct);
router.route("/all").get(getAllProduct);
router.route("/filterSlugurl").get(filterSlugurl);

router.route("/slugurl/:slugurl").get(SlugUrlExist);

router.route("/productimages").post(UploadProductImage);
router.route("/:id").put(UpdateProduct);
router.route("/:id").delete(DeleteProduct);
module.exports = router;