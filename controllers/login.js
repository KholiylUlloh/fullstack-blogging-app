const User = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  });
};
