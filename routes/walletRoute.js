const express = require("express");
const {
  createWallet,
  getAllWallet,
  WalletByClientId,
  UpdateWalletAll,
  DeleteWallet
} = require("../controllers/walletCountroller");
const router = express.Router();
router.route("/new").post(createWallet);
router.route("/all").get(getAllWallet);
router.route("/updatewalletall").get(UpdateWalletAll);
router.route("/:id").delete(DeleteWallet);
router.route("/walletbyclientid/:id").get(WalletByClientId);

module.exports = router;
