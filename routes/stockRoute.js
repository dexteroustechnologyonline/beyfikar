const express = require("express");
const {
  createStock,
  getAllStock,
  UpdateStock,
  DeleteStock,
} = require("../controllers/stockController");

const router = express.Router();
router.route("/new").post(createStock);
router.route("/all").get(getAllStock);

router.route("/:id").put(UpdateStock);
router.route("/:id").delete(DeleteStock);

module.exports = router;
