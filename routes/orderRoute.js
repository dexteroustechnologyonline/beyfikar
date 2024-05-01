const express = require("express");

const {
  createOrder,
  getAllOrder,
  UpdateOrder,
  OrderByClientId,
  OrdergetLast10,
  GetSingleOrderbyId,
  UpdateSingleOrdereitem,
  callbackUrl,
  createOrderForWebsite,
  getOrderRecieved,
  getOrderProcessing,
  getOrderDispatched,
  getOrderOutforDelivery,
  getOrderDelivered,
  getOrderCancelled,
  getOrderDeliveredByLimit,
  generateNewTokenIdForWebSite,
  getOrderOutforDeliveryByDeliveryman,
  getOrderDeliveriedByDeliveryman,
  getOrderCancelledByDeliveryman
} = require("../controllers/orderController");

const router = express.Router();

router.route("/new").post(createOrder);
router.route("/createorderforwebsite").post(createOrderForWebsite);
router.route("/callbackurl").post(callbackUrl);
router.route("/:id").put(UpdateOrder);
router.route("/updatesingleorderitem").put(UpdateSingleOrdereitem);
router.route("/all").get(getAllOrder);
router.route("/orderrecieved").get(getOrderRecieved);
router.route("/orderprocessing").get(getOrderProcessing);
router.route("/orderdispatched").get(getOrderDispatched);
router.route("/Orderoutfordelivery").get(getOrderOutforDelivery);
router.route("/Orderdelivered").get(getOrderDelivered);
router.route("/Orderdeliveredbylimit").get(getOrderDeliveredByLimit);
router.route("/Ordercancelled").get(getOrderCancelled);
router.route("/outfororderbydeliveryman/:id").get(getOrderOutforDeliveryByDeliveryman);
router.route("/order-delivered-bydeliveryman/:id").get(getOrderDeliveriedByDeliveryman);
router.route("/order-cancelled-bydeliveryman/:id").get(getOrderCancelledByDeliveryman);
router.route("/orderbyclientid/:id").get(OrderByClientId);
router.route("/tenOrderbyclient/:id").get(OrdergetLast10);
router.route("/singleorderbyclient/:id").get(GetSingleOrderbyId);
router.route("/generatenewtoken/:id").get(generateNewTokenIdForWebSite);

module.exports = router;
