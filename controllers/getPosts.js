const Post = require("../models/posts");

module.exports = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
};
