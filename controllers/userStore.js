const User = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  User.create(req.body, async (err, user) => {
    if (err) {
      return res.redirect("/reg");
    }
    const crypt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, crypt);
    user.save();
    res.redirect("/");
  });
};
