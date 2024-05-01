const express = require("express");

const {
  createSubscriptionOrder,
  getAllSubscriptionOrder,
  updateSubscriptionOrder,
  subscriptionOrderByClientId,
  GenerateSubscriptionOrder,
  subscriptionOrderById,
  getTodayGeneratedSubscriptionOrder,
} = require("../controllers/subscriptionOrderController");

const router = express.Router();

router.route("/new").post(createSubscriptionOrder);
router.route("/generatesubscriptionorder").get(GenerateSubscriptionOrder);
router.route("/all").get(getAllSubscriptionOrder);
router.route("/today-generated-orders").get(getTodayGeneratedSubscriptionOrder);
router.route("/suborderbyclientid/:id").get(subscriptionOrderByClientId);
router.route("/sub-single-order/:id").get(subscriptionOrderById);
router.route("/:id").put(updateSubscriptionOrder);

module.exports = router;
