const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    deviceToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Notification", notificationSchema);
