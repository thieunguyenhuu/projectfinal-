const express = require("express");
const router = express.Router();

//config
const passport = require("passport");
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../../config/authMiddleware");

const AuthController = require("../../controllers/user/AuthController");
const HomeController = require("../../controllers/user/HomeController");
const ProductController = require("../../controllers/user/ProductController");
const CartController = require("../../controllers/user/CartController");
const CheckoutController = require("../../controllers/user/CheckoutController");

/* GET home page. */
router.get("/", HomeController.index);
/* GET shop page. */
router.get("/products", ProductController.index);
/* GET cart page. */
router.get("/products/:slug", ProductController.show);
/* GET cart page. */
// router.get("/cart/add/:id",  function (req, res, next){
//   res.render("/cart", { title: "cart"});
// });
/* GET checkout page. */
// router.get("/checkout", function (req, res, next) {
//   res.render("checkout", { title: "Checkout" });
// });
// router.get("/checkout", isAuthenticated, CheckoutController.index);
router.get("/checkout", CheckoutController.index);
router.post("/checkout", CheckoutController.create);

//get cart page
// router.get("/cart", function (req, res, next) {
//   res.render("cart", { title: "cart" });
// });
router.get("/carts", CartController.getAll);
router.get("/cart/add/:id", CartController.addToCart);
router.get("/cart/delete/:id", CartController.deleteCart);

//profile
router.get("/profile", function (req, res, next) {
  res.render("profile", { title: "Profile" });
});

/* GET login page. */
router.get("/news", function (req, res, next) {
  res.render("new", { title: "News" });
});
/* GET blogdetail page. */
router.get("/news/:slug", function (req, res, next) {
  res.render("newDetail", { title: "News Detail" });
});

//about
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About" });
});

//auth
//login
router.get("/login", isNotAuthenticated, AuthController.getLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);


//register
router.get("/register", isNotAuthenticated, AuthController.getRegister);
router.post("/register", AuthController.postRegister);

router.get("/logout", isAuthenticated, AuthController.logout);

module.exports = router;
