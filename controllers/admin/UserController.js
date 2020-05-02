const bcrypt = require("bcryptjs");
const models = require("../../models");

const index = async (req, res) => {
  let users = await models.User.findAll({ where: { isAdmin: false } });
  res.render("admin/user/listUser", {
    title: "Khách hàng",
    users,
  });
};

const store = (req, res) => {
  let { name, email, password, phoneNumber, address } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
      } else {
        const user = await models.User.create({
          name,
          email,
          password: hash,
          phoneNumber,
          address,
          isAdmin: false,
        });
        if (user) {
          req.flash("flashMessage", "Thêm thành công");
          res.redirect("back");
        }
      }
    });
  });
};

const getUserById = async (req, res) => {
  let userId = req.params.id;
  let user = await models.User.findByPk(userId);
  res.json({
    status: 200,
    data: user,
  });
};

const update = async (req, res) => {
  let userId = req.params.id;
  let { name, phoneNumber, address } = req.body;

  let user = await models.User.update(
    {
      name,
      phoneNumber,
      address,
    },
    { where: { id: userId } }
  );
  if (user) {
    req.flash("flashMessage", "Cập nhật thành công");
    res.redirect("back");
  }
};

const destroy = async (req, res) => {
  let userId = req.params.id;
  await models.User.destroy({ where: { id: userId } });

  req.flash("flashMessage", "Xoá thành công");
  res.redirect("back");
};

module.exports = { index, store, getUserById, update, destroy };
