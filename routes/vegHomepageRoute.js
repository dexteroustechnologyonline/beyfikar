const express = require("express");
const {
  createVegHomepage,
  getAllVegHomepage,
  UpdateVegHomepage
} = require("../controllers/vegHomepageController");

const router = express.Router();
router.route("/new").post(createVegHomepage);
router.route("/all").get(getAllVegHomepage);
router.route("/:id").put(UpdateVegHomepage);

module.exports = router;
