const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  userID: {
    type: String,
    ref: "users",
  },
  commentID: {
    type: String,
    ref: "comments",
  },
  productID: {
    type: String,
    ref: "products",
  },
});

module.exports = mongoose.model("likes", likeSchema);
