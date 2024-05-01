const express = require("express");
const {
    createAdmin,loginAdminwithpassword,mobileExist,emailExist,
    UpdateSuperCategory
} = require("../controllers/adminController");

const router = express.Router();
router.route("/register").post(createAdmin);
router.route("/login").post(loginAdminwithpassword);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);
router.route("/:id").put(UpdateSuperCategory);


module.exports = router;
