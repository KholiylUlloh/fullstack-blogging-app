const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: String,
  description: String,
  content: String,
  username: String,
  created_at: {
    type: Date,
    default: new Date(),
  },
  image: String,
});

const Post = model("Post", PostSchema);

module.exports = Post;
