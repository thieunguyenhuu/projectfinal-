const express = require("express");
const router = express.Router();

// Set currentUser to locals
router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

router.use("/", require(__dirname + "/groups/user"));
router.use("/admin", require(__dirname + "/groups/admin"));

module.exports = router;
