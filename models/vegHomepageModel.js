const mongoose = require("mongoose");

const vegHomepageSchema = mongoose.Schema({
  offerComponent: {
    type: Boolean,
    default: false,
  },
  CouponsComponent: {
    type: Boolean,
    default: false,
  },
  HotDealsComponent: {
    type: Boolean,
    default: false,
  },
  MustHaveItemsComponent: {
    type: Boolean,
    default: false,
  },
  CategoryPageComponent: {
    type: Boolean,
    default: false,
  },
  LimitedPeriodComponent: {
    type: Boolean,
    default: false,
  },
  FreeDeliveryComponent: {
    type: Boolean,
    default: false,
  },
  TodayFeaturedSliderComponent: {
    type: Boolean,
    default: false,
  },
  CantMissComponent: {
    type: Boolean,
    default: false,
  },
  FreshVegetablesComponent: {
    type: Boolean,
    default: false,
  },
  FreshFruitComponent: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VegHomepage", vegHomepageSchema);
