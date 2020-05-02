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

/* GET home page. */
router.get("/", HomeController.index);
/* GET shop page. */
router.get("/products", ProductController.index);
/* GET cart page. */
router.get("/products/:slug", ProductController.show);
/* GET cart page. */
router.get("/cart", function (req, res, next) {
  res.render("cart", { title: "Cart" });
});
/* GET checkout page. */
router.get("/checkout", function (req, res, next) {
  res.render("checkout", { title: "Checkout" });
});
/* xử lý đăng ký */

// app.post('/signup', passport.authenticate('local-signup', {
//   successRedirect : '/profile', // Điều hướng tới trang hiển thị profile
//   failureRedirect : '/signup', // Trở lại trang đăng ký nếu lỗi
//   failureFlash : true
// }));

/* GET login page. */
router.get("/news", function (req, res, next) {
  res.render("new", { title: "News" });
});
/* GET blogdetail page. */
router.get("/news/:slug", function (req, res, next) {
  res.render("newDetail", { title: "News Detail" });
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
