// const { dateTimeFilter } = require("../../helpers/filterDate");
// const { filterStatus } = require("../../helpers/filterStatus");
const models = require("../../models");
const Product = models.Product;
const Order = models.Order;
const OrderDetail = models.OrderDetail;
const {
  isAuthenticated,
  isNotAuthenticated,
} = require("../../config/authMiddleware");

const index = async (req, res) => {
  //   console.log('zo 22')
  //   let carts = [];

  //   if (req.session && req.session.cart) {
  //     carts = req.session.cart
  //     result = [];
  //     let totalCart = 0;
  //     let count = 0
  //     for (const e of carts) {
  //         count += e.qty
  //         const product = await Product.findByPk(e.id);
  //         totalCart += e.qty * product.price;
  //   }
  //     res.render("checkout", { title: "Checkout",carts });
  // }
  let carts = [];
  if (req.session && req.session.cart) {
    carts = req.session.cart
    result = [];
    let totalCart = 0;
    let count = 0
    for (const e of carts) {
      count += e.qty
      const product = await Product.findByPk(e.id);
      totalCart += e.qty * product.price

      result.push({
        id: e.id,
        qty: e.qty,
        price: product ? product.price : "",
        name: product ? product.name : ""
      });
    }
    res.render("checkout", { result, count, totalCart })
  }
};

const create = async (req, res) => {
  const { receiverName, receiverEmail, receiverPhoneNumber, receiverAddress, totalAmount } = req.body;
  const userId = req.user.id;
  let carts = [];
  if (req.session && req.session.cart) {
    carts = req.session.cart;
  }
  let code = new Date().getTime();
  let order = await Order.create({
    code, receiverName, receiverEmail, receiverPhoneNumber, receiverAddress, total: 0, totalAmount: parseInt(totalAmount), statusId: 1, userId
  });
  carts.map(async item => {
    await OrderDetail.create({
      quantity: item.qty,
      price: parseInt(item.price),
      productId: item.id,
      orderId: order.id
    })
    req.flash("flashMessage", "Đặt hàng thành công");
  res.redirect("/");
  })

  delete req.session.cart;

  
};

module.exports = { index, create };
