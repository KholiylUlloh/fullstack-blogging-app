const Post = require("../models/posts");
const path = require("path");

module.exports = (req, res) => {
  const { image } = req.files;
  image.mv(
    path.resolve(__dirname, "..", "public/postImgs", image.name),
    (err) => {
      if (err) {
        console.log(err);
      }
      Post.create(
        { ...req.body, image: `postImgs/${image.name}` },
        (err, post) => {
          res.redirect("/");
        }
      );
    }
  );
};
