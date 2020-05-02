const index = (req, res) => {
  res.render("admin/dashboard", { title: "Dashboard" });
};

module.exports = { index };
