const models = require("../../models");
const Producer = models.Producer;

const index = async (req, res) => {
  let producers = await Producer.findAll();

  res.render("admin/producer/listProducer", {
    title: "Nhà sản xuất",
    producers,
  });
};

const store = async (req, res) => {
  let { name, country } = req.body;
  let producer = await Producer.create({
    name,
    country,
  });

  if (producer) {
    req.flash("flashMessage", "Thêm thành công");
    res.redirect("back");
  }
};

const getProducerById = async (req, res) => {
  let producerId = req.params.id;
  let producer = await Producer.findByPk(producerId);
  res.json({
    status: 200,
    data: producer,
  });
};

const update = async (req, res) => {
  let producerId = req.params.id;
  let { name, country } = req.body;
  let producer = await Producer.update(
    {
      name,
      country,
    },
    { where: { id: producerId } }
  );

  if (producer) {
    req.flash("flashMessage", "Cập nhật thành công");
    res.redirect("back");
  }
};

const destroy = async (req, res) => {
  let producerId = req.params.id;
  await Producer.destroy({ where: { id: producerId } });

  req.flash("flashMessage", "Xoá thành công");
  res.redirect("back");
};

module.exports = { index, store, getProducerById, update, destroy };
