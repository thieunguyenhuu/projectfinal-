const { dateTimeFilter } = require("../../helpers/filterDate");
const models = require("../../models");
const { Product, Rating, User } = models;

const index = async (req, res) => {
  let page = req.query.page || 1;

  let products = await Product.findAll({
    include: [{ model: Rating }],
    where: { isActive: true },
    offset: (page - 1) * 2,
    limit: 2,
  });

  res.render("product", { title: "Sản phẩm", products });
};

const show = async (req, res) => {
  let slug = req.params.slug;
  let product = await Product.findOne({
    include: [{ model: Rating }],
    where: { isActive: true, slug },
  });
  let ratings = await Rating.findAll({
    include: [{ model: User }],
    where: { isActive: true, productId: product.id },
  });

  if (product) {
    res.render("productDetail", {
      title: product.name,
      product,
      ratings,
      dateTimeFilter,
    });
  }
};

module.exports = { index, show };
