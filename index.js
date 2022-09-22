const express = require("express");
const edge = require("express-edge");
const path = require("path");
const mongoose = require("mongoose");
const homePage = require("./controllers/homePage");
const getPosts = require("./controllers/getPosts");
const newPosts = require("./controllers/newPosts");
const createPost = require("./controllers/createPost");
const contacts = require("./controllers/contact");
const userStore = require("./controllers/userStore");
const loginUser = require("./controllers/login");
const validateMiddleware = require("./controllers/middleware/validateMiddleware");
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

app.get("/", homePage);
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/post/:id", getPosts);
app.get("/contact", contacts);
app.get("/posts/new", newPosts);

app.post("/posts/create", validateMiddleware, createPost);
app.get("/reg", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/auth/reg", userStore);
app.post("/auth/login", loginUser);

PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
