const { slugString } = require("../../helpers/slugString");
const models = require("../../models");
const Category = models.Category;
const Producer = models.Producer;
const Product = models.Product;

const index = async (req, res) => {
  let categories = await Category.findAll();
  let producers = await Producer.findAll();
  let products = await Product.findAll({
    include: [
      {
        model: Category,
      },
      {
        model: Producer,
      },
    ],
  });

  res.render("admin/product/listProduct", {
    title: "Sản phẩm",
    categories,
    producers,
    products,
  });
};

const store = async (req, res) => {
  let {
    name,
    description,
    inStock,
    price,
    isActive,
    categoryId,
    producerId,
  } = req.body;

  let code = Date.now();
  let images = req.files.map((item) => item.filename);

  let product = await Product.create({
    code,
    name,
    slug: slugString(name),
    description,
    images: images,
    inStock,
    price,
    isActive,
    categoryId,
    producerId,
  });

  if (product) {
    req.flash("flashMessage", "Thêm thành công");
    res.redirect("back");
  }
};

const getProductById = async (req, res) => {
  let productId = req.params.id;
  let product = await Product.findByPk(productId);
  res.json({
    status: 200,
    data: product,
  });
};

const update = async (req, res) => {
  let productId = req.params.id;
  let {
    name,
    description,
    inStock,
    price,
    isActive,
    categoryId,
    producerId,
  } = req.body;
  let product;

  if (req.files.length > 0) {
    let images = req.files.map((item) => item.filename);
    product = await Product.update(
      {
        name,
        slug: slugString(name),
        images,
        description,
        inStock,
        price,
        isActive,
        categoryId,
        producerId,
      },
      { where: { id: productId } }
    );
  } else {
    product = await Product.update(
      {
        name,
        slug: slugString(name),
        description,
        inStock,
        price,
        isActive,
        categoryId,
        producerId,
      },
      { where: { id: productId } }
    );
  }

  if (product) {
    req.flash("flashMessage", "Cập nhật thành công");
    res.redirect("back");
  }
};

const updateActive = async (req, res) => {
  let { isActive, productId } = req.body;

  try {
    await Product.update(
      {
        isActive,
      },
      { where: { id: productId } }
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

const destroy = async (req, res) => {
  let productId = req.params.id;
  await Product.destroy({ where: { id: productId } });

  req.flash("flashMessage", "Xoá thành công");
  res.redirect("back");
};

module.exports = {
  index,
  store,
  getProductById,
  update,
  updateActive,
  destroy,
};
