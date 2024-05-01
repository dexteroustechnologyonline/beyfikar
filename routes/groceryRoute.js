const express = require("express");
const {
  createGrocery,
  getAllGrocery,
  UpdateGrocery,
  DeleteGrocery,
  SlugUrlExist,
  UploadGroceryImage,
  getAllTrending,
  getAllHotProducts,
  getAllOffers,
  getAllDealOfTheDAy,
  gatBannerTag,
  gatCategoryTag,
  gatUniversalTag,
  gorcerybysupercatid,
  gorcerybycatid,
  getgorcerybysubcatid,
  myGroceryAll,
  Grocerybyid,
  getAllDealOfTheDayBySuperCat,
  getAllHotProductsBySuperCat,
  getAlltrendingProductsBySuperCat,
  getAllOfferProductsBySuperCat,
  UpdateGroceryPacksize,
  AddGroceryPacksize,
  getAllhotProducts,
  UpdateGroceryall,
  removeallPacksize,
  UpdateGrocerySinglePacksize, gorcerysearchbykeywords, getAllTrendingProducts, getAllOffersProducts, GrocerybySlugurl, getAllGroceryInStock,
  filterSlugurl,
  getAllDeletemany
} = require("../controllers/groceryController");

const router = express.Router();
router.route("/updategrocerytoall").put(UpdateGroceryall);
router.route("/singlepacksizeprice").put(UpdateGrocerySinglePacksize);
router.route("/new").post(createGrocery);
router.route("/all").get(getAllGrocery);
router.route("/alldeletemany").get(getAllDeletemany);
router.route("/groceryinstock").get(getAllGroceryInStock);
router.route("/updateall").get(myGroceryAll);
router.route("/filterSlugurl").get(filterSlugurl);
router.route("/trendings").get(getAllTrending);
router
  .route("/trendingproductsbysupercat/:id")
  .get(getAlltrendingProductsBySuperCat);
router.route("/hotproducts").get(getAllHotProducts);
router.route("/offerproducts").get(getAllOffersProducts);
router.route("/hotproductsbysupercat/:id").get(getAllHotProductsBySuperCat);
router.route("/offers").get(getAllOffers);
router
  .route("/offersproductsbysupercat/:id")
  .get(getAllOfferProductsBySuperCat);

router.route("/treanding").get(getAllTrendingProducts);
router.route("/dealoftheday").get(getAllDealOfTheDAy);
router.route("/hotproducts").get(getAllhotProducts);
router.route("/dealofthedaybysupercat/:id").get(getAllDealOfTheDayBySuperCat);
router.route("/slugurl/:slugurl").get(SlugUrlExist);
router.route("/groceryimages").post(UploadGroceryImage);
router.route("/bannertag/:bantagname").get(gatBannerTag);
router.route("/categorytag/:cattagname").get(gatCategoryTag);
router.route("/universaltag/:unitagname").get(gatUniversalTag);
router.route("/grocerybysupercatid/:id").get(gorcerybysupercatid);
router.route("/gorcerysearchbykeywords/:keywords").get(gorcerysearchbykeywords);
router.route("/grocerybycatid/:id").get(gorcerybycatid);
router.route("/grocerybysubcatid/:id").get(getgorcerybysubcatid);
router.route("/grocerybyid/:id").get(Grocerybyid);
router.route("/Grocerybyslugurl/:url").get(GrocerybySlugurl);
router.route("/:id").put(UpdateGrocery);
router.route("/packsize/:id").put(UpdateGroceryPacksize);

router.route("/:id").delete(DeleteGrocery);
router.route("/packsize/removeAllpacksize").get(AddGroceryPacksize);


module.exports = router;
