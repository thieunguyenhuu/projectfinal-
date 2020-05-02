const prefix = "admin";
const express = require("express");
const router = express.Router();

//controllers
const DashboardController = require("../../controllers/admin/DashboardController");
const UserController = require("../../controllers/admin/UserController");
const RatingController = require("../../controllers/admin/RatingController");

const ProducerController = require("../../controllers/admin/ProducerController");
const ProductController = require("../../controllers/admin/ProductController");
const OrderController = require("../../controllers/admin/OrderController");

// middleware
const { isAdmin } = require("../../config/authMiddleware");
router.get("*", isAdmin, (req, res, next) => {
  next();
});

//upload
const upload = require("../../config/multer");

//dashboard
router.get("/dashboard", DashboardController.index);

//user page
router.get("/users", UserController.index);
router.post("/add-user", UserController.store);
router.get("/get-user/:id", UserController.getUserById);
router.post("/update-user/:id", UserController.update);
router.post("/delete-user/:id", UserController.destroy);

//rating page
router.get("/ratings", RatingController.index);
router.post("/update-rating/:id", RatingController.update);
router.post("/delete-rating/:id", RatingController.destroy);

//producer page
router.get("/producers", ProducerController.index);
router.post("/add-producer", ProducerController.store);
router.get("/get-producer/:id", ProducerController.getProducerById);
router.post("/update-producer/:id", ProducerController.update);
router.post("/delete-producer/:id", ProducerController.destroy);

//product page
router.get("/products", ProductController.index);
router.post(
  "/add-product",
  upload.array("images", 10),
  ProductController.store
);
router.get("/get-product/:id", ProductController.getProductById);
router.post(
  "/update-product/:id",
  upload.array("images", 10),
  ProductController.update
);
router.post("/update-product-active", ProductController.updateActive);
router.post("/delete-product/:id", ProductController.destroy);

//rating page
router.get("/ratings", RatingController.index);
router.post("/update-rating/:id", RatingController.update);
router.post("/delete-rating/:id", RatingController.destroy);

//order page
router.get("/orders", OrderController.index);
router.post("/get-order", OrderController.getOrderByCode);
router.get("/order-detail/:id", OrderController.getOrderDetail);
router.post("/update-order/:id", OrderController.update);
//
router.get("/news", (req, res) => {
  res.render(`${prefix}/new/listNew`, { title: "Tin tức" });
});

router.get("/discount-codes", (req, res) => {
  res.render(`${prefix}/discount/listDiscount`, { title: "Mã giảm giá" });
});

module.exports = router;
