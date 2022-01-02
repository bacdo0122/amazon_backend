const mongoose = require("mongoose");

const Productschema = mongoose.Schema({
  title: Boolean,
  name: String,
  image: String,
  count: String,
  star: Object,
  numberVote: String,
  dolar: Number,
  cent: Number,
  per: String,
  discount: String,
  prime: Boolean,
  time: String,
  remain: String,
  newDolarOffer: String,
  titleOffer: String,
  content: String,
  color: String,
  mutltiColor: Array,
  brand: String,
});
module.exports = mongoose.model("products", Productschema);
