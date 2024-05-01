const express = require("express");

const {
    createSubscriptionTakenOrder,
    getAllSubscriptionTakenOrder,
    updateSubscriptionTakenOrder,
    subscriptionTakenOrderByClientId,
    subscriptionOrderGeneration
} = require("../controllers/subscriptionTakenorderController");

const router = express.Router();

router.route("/new").post(createSubscriptionTakenOrder);
router.route("/all").get(getAllSubscriptionTakenOrder);
router.route("/order-generation").get(subscriptionOrderGeneration);
router.route("/suborderbyclientid/:id").get(subscriptionTakenOrderByClientId);
router.route("/:id").put(updateSubscriptionTakenOrder);

module.exports = router;
