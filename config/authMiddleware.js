const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
};

const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  } else if (!res.locals.currentUser.isAdmin) {
    return res.redirect("/");
  }
  next();
};

module.exports = { isAuthenticated, isNotAuthenticated, isAdmin };
