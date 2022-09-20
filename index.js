const express = require("express");
const edge = require("express-edge");
const path = require("path");
const mongoose = require("mongoose");
const Post = require("./models/posts");
const flUploader = require("express-fileupload");
require("dotenv").config({ path: ".env" });

const app = express();

////////////////////////////////////////////////////////////////////////////////
mongoose.connect(`${process.env.MONGODB_URI}`, (err) => {
  console.log("Connected to MongoDB");
  if (err) {
    console.log("Error connecting");
  }
});
////////////////////////////////////////////////////////////////////////////////

app.use(express.static("public"));
app.use(edge.engine);
app.set("views", `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flUploader());

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/create", (req, res) => {
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
});

PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
