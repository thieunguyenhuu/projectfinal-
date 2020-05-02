const LocalStrategy = require("passport-local").Strategy;
const models = require("../models");
const bcrypt = require("bcryptjs");

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await models.User.findOne({ where: { email: email } });
    if (user == null) {
      return done(null, false, { message: "Email không đúng" });
    }
    try {
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          console.log(err);
        }
        if (!isMatch) {
          return done(null, false, { message: "Mật khẩu không đúng" });
        } else {
          return done(null, user);
        }
      });
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await models.User.findByPk(id);
    
    done(null, user);
  });
};

module.exports = initialize;
