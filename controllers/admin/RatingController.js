const { dateTimeFilter } = require("../../helpers/filterDate");
const models = require("../../models");
const Rating = models.Rating;
const Product = models.Product;
const User = models.User;

const index = async (req, res) => {
  let ratings = await Rating.findAll({
    include: [
      {
        model: Product,
      },
      {
        model: User,
      },
    ],
  });
  res.render("admin/rating/listRating", {
    title: "Đánh giá",
    ratings,
    dateTimeFilter,
  });
};

const update = async (req, res) => {
  let ratingId = req.params.id;
  let { isActive } = req.body;

  try {
    await Rating.update(
      {
        isActive,
      },
      { where: { id: ratingId } }
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
  let ratingId = req.params.id;
  await Rating.destroy({ where: { id: ratingId } });

  req.flash("flashMessage", "Xoá thành công");
  res.redirect("back");
};

module.exports = { index, update, destroy };
