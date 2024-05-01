const express = require("express");
const {
  createNotification,
  getAllNotifications,
} = require("../controllers/notificationController");

const router = express.Router();
router.route("/new").post(createNotification);
router.route("/all").get(getAllNotifications);

module.exports = router;
