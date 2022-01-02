const mongoose = require("mongoose");

const Userchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  birthday: String,
  IdentifyCard: String,
  image: {
    type: String,
    default:
      "https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png",
  },
});

module.exports = mongoose.model("users", Userchema);
