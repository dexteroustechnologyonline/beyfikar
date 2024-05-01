const mongoose = require("mongoose");

const massageSchema = mongoose.Schema({
    massageShown: {
        type: Boolean,
        default: false
    },
    superMartShown: {
        type: Boolean,
        default: false
    },
    MassageText: {
        type: String
    },
    deliveryMassageText: {
        type: String
    },
    deliveryMassageTextafter8: {
        type: String
    },
    appVersion: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Massage", massageSchema);
