const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  star: { type: Object, require: true },
  context: {
    type: String,
    require: true,
  },
  type: { type: String, require: true },
  createAt: { type: Date, require: true },
  like: { type: Number },
  product: {
    type: String,
    ref: "products",
  },
  user: {
    type: String,
    ref: "users",
  },
});

module.exports = mongoose.model("comments", commentSchema);
