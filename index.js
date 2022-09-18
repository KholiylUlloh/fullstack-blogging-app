const express = require("express");
const edge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/posts");
require("dotenv").config({ path: ".env" });

const app = express();

////////////////////////////////////////////////////////////////////////////////
mongoose.connect(`${process.env.MONGODB_URI}`, () => {
  console.log("Connected to MongoDB");
});
////////////////////////////////////////////////////////////////////////////////

app.use(express.static("public"));
app.use(edge.engine);
app.set("views", `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/post", (req, res) => {
  res.render("post");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/created", (req, res) => {
  Post.create(req.body, (err, post) => {
    res.redirect("/");
    // console.log(err);
    console.log(req.body);
  });
});
app.listen(3002, () => console.log("Server is running on port 3002"));
