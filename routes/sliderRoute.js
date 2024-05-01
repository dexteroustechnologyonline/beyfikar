const express = require("express");
const {
  createSlider,
  getAllSlider,
  UpdateSlider,
  DeleteSlider,
  SliderUrlExist,
  UploadSliderDeskImage,
  UploadSliderMobImage,
  sliderbyid,
  slidercatid,
} = require("../controllers/sliderController");

const router = express.Router();
router.route("/new").post(createSlider);
router.route("/all").get(getAllSlider);
router.route("/url/:url").get(SliderUrlExist);
router.route("/sliderdeskimages").post(UploadSliderDeskImage);
router.route("/slidermobileimages").post(UploadSliderMobImage);
router.route("/sliderbyid/:id").get(sliderbyid);
router.route("/sliderbycatid/:id").get(slidercatid);
router.route("/:id").put(UpdateSlider);
router.route("/:id").delete(DeleteSlider);

module.exports = router;
