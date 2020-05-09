// const { dateTimeFilter } = require("../../helpers/filterDate");
// const { filterStatus } = require("../../helpers/filterStatus");
const models = require("../../models");
const Product = models.Product;
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../../config/authMiddleware");

const index = async (req, res) => {
  let carts = [];

  if (req.session && req.session.cart) {
    carts = req.session.cart
    result = [];
    let totalCart = 0;
    let count = 0
    for (const e of carts) {
        count += e.qty
        const product = await Product.findByPk(e.id);
        totalCart += e.qty * product.price;
  }
    res.render("checkout", { title: "Checkout",carts });
}
  // let carts = [];
  // if (req.session && req.session.cart) {
  //     carts = req.session.cart
  //     result = [];
  //     let total = 0;
  //     let count = 0
  //     for (const e of carts) {
  //         count += e.qty
  //         const product = await Product.findByPk(e.id);
  //         total += e.qty * product.price

  //         result.push({
  //             id: e.id,
  //             qty: e.qty,
  //             price: product ? product.price : "",
  //             image: product && product.images ? "/uploads/" + product.images[0] : "",
  //             name: product ? product.name : ""
  //         });
  //     }
  //     res.render("pages/cart", { result, count,total })
  // }
  // res.json({
  //     success: true,
  //     data: {
  //         html: "",
  //         count: 0
  //     }
  // });

};
module.exports = { index };
