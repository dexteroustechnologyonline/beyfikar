const express = require("express");
const {
    createCart,
    getAllCart,
    cartrByClientId,
    UpdateCart
} = require("../controllers/cartController");

const router = express.Router();
router.route("/new").post(createCart);
router.route("/all").get(getAllCart);
router.route("/cartbyclientid/:id").get(cartrByClientId);
router.route("/cartupdatebyid/:id").get(UpdateCart);

module.exports = router;
