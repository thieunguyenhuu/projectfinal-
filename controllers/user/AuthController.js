const bcrypt = require("bcryptjs");
const models = require("../../models");

const getLogin = (req, res) => {
  res.render("login", { title: "Login" });
};

const getRegister = (req, res) => {
  res.render("register", { title: "Register", errors: [] });
};
const postRegister = async (req, res) => {
  let {
    name,
    email,
    phoneNumber,
    address,
    password,
    confirmPassword,
  } = req.body;

  let errors = [];
  let userExists = await models.User.findOne({ where: { email: email } });
  if (userExists) {
    errors.push({
      message: "Email này đã tồn tại",
    });
    res.render("register", { errors: errors });
    return;
  } else {
    if (password !== confirmPassword) {
      errors.push({
        message: "Mật khẩu xác nhận không khớp",
      });
      res.render("register", { errors: errors });
      return;
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (!err) {
            let user = await models.User.create({
              name,
              email,
              password: hash,
              phoneNumber,
              address,
              isAdmin: false,
            });
            req.flash("registerSuccess", "Đăng ký thành công");
            res.redirect("/login");
          }
        });
      });
    }
  }
};
const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = { getLogin, getRegister, postRegister, logout };
