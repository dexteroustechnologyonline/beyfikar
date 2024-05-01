const express = require("express");
const {
  createClient,
  getAllClient,
  UpdateCLient,
  UpdateCLientAddress,
  clientById,
  DeleteClient,
  loginClient,
  AddclientAddress,
  UpdateClientSingleAddress,
  DeleteClientSingleAddress,
  mobileExist,
  updateAllClient,
  getAllSubscriptionActiveClient
} = require("../controllers/clientController");

const router = express.Router();
router.route("/new").post(createClient);
router.route("/loginclient").post(loginClient);
router.route("/all").get(getAllClient);
router.route("/activeclients").get(getAllSubscriptionActiveClient);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/updateclientsingleaddress").put(UpdateClientSingleAddress);
router.route("/deleteclientsingleaddress").put(DeleteClientSingleAddress);
router.route("/Clientid/:id").put(UpdateCLient);
router.route("/address").put(UpdateCLientAddress);
router.route("/bulkaddress/:id").put(AddclientAddress);
router.route("/clientbyid/:id").get(clientById);
router.route("/updateAllClient").get(updateAllClient);
router.route("/clientdelete/:id").delete(DeleteClient);
module.exports = router;
