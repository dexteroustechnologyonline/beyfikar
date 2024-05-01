const express = require("express");
const {
    createmessage,
    UpdateMassage,
    getMassage,
} = require("../controllers/massageController");

const router = express.Router();

router.route("/new").post(createmessage);
router.route("/getmassage").get(getMassage);
router.route("/:id").put(UpdateMassage);

module.exports = router;
