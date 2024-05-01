const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
// var session = require("express-session");

const errorMiddleware = require("./middleware/error");

// const PORT = process.env.PORT || 4000;

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

// app.use(express.json());
// app.use(cookieParser());
// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "10000kb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
// app.use(fileUpload({ useTempFiles: true }));

// const corsOptions = {
//   origin: "*",
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, parameterLimit: 500000, limit: '50mb' }))
app.use(cookieParser());

//Rotes Imports

const admin = require("./routes/adminRoute");
app.use("/api/v1/admin", admin);

const supercategory = require("./routes/superCategoryRoute");
app.use("/api/v1/supercategory", supercategory);

const category = require("./routes/categoryRoute");
app.use("/api/v1/category", category);

const brand = require("./routes/brandRoute");
app.use("/api/v1/brand", brand);

const subcatbslider = require("./routes/subCateSliderRoute");
app.use("/api/v1/subcatbslider", subcatbslider);

const subcategory = require("./routes/subCategoryRoute");
app.use("/api/v1/subcategory", subcategory);

const grocery = require("./routes/groceryRoute");
app.use("/api/v1/grocery", grocery);

const product = require("./routes/productRoute");
app.use("/api/v1/product", product);

const subscription = require("./routes/subscriptionRoute");
app.use("/api/v1/subscription", subscription);

const order = require("./routes/orderRoute");
app.use("/api/v1/order", order);

const subscriptionorder = require("./routes/subscriptionOrderRoute");
app.use("/api/v1/subscriptionorder", subscriptionorder);

const slider = require("./routes/sliderRoute");
app.use("/api/v1/slider", slider);

const subcatbanner = require("./routes/subCatBannerRoute");
app.use("/api/v1/subcatbanner", subcatbanner);

const stock = require("./routes/stockRoute");
app.use("/api/v1/stock", stock);

const coupon = require("./routes/couponRoute");
app.use("/api/v1/coupon", coupon);

const employee = require("./routes/employeeRoute");
app.use("/api/v1/employee", employee);

const pinamount = require("./routes/pinAmountRouteTable");
app.use("/api/v1/pinamount", pinamount);

const client = require("./routes/clientRoute");
app.use("/api/v1/client", client);

const offersbanner = require("./routes/offersBannerRoute");
app.use("/api/v1/offersbanner", offersbanner);

const universaltag = require("./routes/universalTagRoute");
app.use("/api/v1/universaltag", universaltag);

const categorytag = require("./routes/categoryTagRoute");
app.use("/api/v1/categorytag", categorytag);

const bannertag = require("./routes/bannerTagRoute");
app.use("/api/v1/bannertag", bannertag);

const veghomepage = require("./routes/vegHomepageRoute");
app.use("/api/v1/veghomepage", veghomepage);

const todaysFeatured = require("./routes/toDaysFeatureRoute");
app.use("/api/v1/todaysfeatured", todaysFeatured);

const bestOfferBanner = require("./routes/bestOfferBannerRoute");
app.use("/api/v1/bestofferbanner", bestOfferBanner);

const topBanner = require("./routes/topBannerRoute");
app.use("/api/v1/topbanner", topBanner);

const infocusToday = require("./routes/inFocusTodayRoute");
app.use("/api/v1/infocustoday", infocusToday);

const featuredInWeek = require("./routes/featuresInWeekRoute");
app.use("/api/v1/featuredinweek", featuredInWeek);

const wallet = require("./routes/walletRoute");
app.use("/api/v1/wallet", wallet);

const massage = require("./routes/massageRoute");
app.use("/api/v1/massage", massage);

const notifications = require("./routes/notificationRoute");
app.use("/api/v1/notifications", notifications);

const cart = require("./routes/cartRoute");
app.use("/api/v1/cart", cart);

const subscriptiontakenOrder = require("./routes/subscriptionTakenOrderRoute");
app.use("/api/v1/subscriptiontakenOrder", subscriptiontakenOrder);

app.use(errorMiddleware);

module.exports = app;
