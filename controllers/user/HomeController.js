const sequelize = require("sequelize");
const models = require("../../models");
const { Product, Rating } = models;

const index = async (req, res) => {
  let products = await Product.findAll({
    include: [{ model: Rating }],
    where: { isActive: true },
    limit: 8,
  });

  console.log(products);

  res.render("home", { title: "Trang chủ", products });
};

module.exports = { index };
