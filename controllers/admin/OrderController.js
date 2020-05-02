const { dateTimeFilter } = require("../../helpers/filterDate");
const { filterStatus } = require("../../helpers/filterStatus");
const models = require("../../models");
const Order = models.Order;
const OrderDetail = models.OrderDetail;
const Product = models.Product;
const OrderStatus = models.OrderStatus;
const User = models.User;

const index = async (req, res) => {
  let orderStatuses = await OrderStatus.findAll();
  let orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: OrderDetail,
      },
      {
        model: OrderStatus,
      },
      {
        model: User,
      },
    ],
  });
  res.render("admin/order/listOrder", {
    title: "Đặt hàng",
    orders,
    orderStatuses,
    dateTimeFilter,
    filterStatus,
  });
};

const getOrderByCode = async (req, res) => {
  let { code } = req.body;
  try {
    let order = await Order.findOne({
      include: [
        {
          model: OrderDetail,
        },
        {
          model: OrderStatus,
        },
      ],
      where: { code },
    });
    res.json({
      success: true,
      data: order,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e,
    });
  }
};

const getOrderDetail = async (req, res) => {
  let { orderId } = req.body;
  try {
    let orderDetails = await OrderDetail.where({
      include: [
        {
          model: Product,
        },
      ],
      where: { orderId: orderId },
    });
    res.json({
      success: true,
      data: orderDetails,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e,
    });
  }
};

const update = async (req, res) => {
  let orderId = req.params.id;
  let { statusId } = req.body;

  try {
    await Order.update(
      {
        statusId,
      },
      { where: { id: orderId } }
    );
    res.json({
      success: true,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e,
    });
  }
};

module.exports = { index, getOrderByCode, getOrderDetail, update };
