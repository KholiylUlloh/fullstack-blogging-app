const Post = require("../models/posts");

module.exports = async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
};
