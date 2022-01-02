const express = require("express");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./admin.json");
const product = require("./router/product");
const user = require("./router/user");
const like = require("./router/like");
const comment = require("./router/comment");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
var whitelist = [
  "http://localhost:3000",
  "https://amazon-frontend1.vercel.app/",
];
const firbaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://function-28be9-default-rtdb.firebaseio.com",
});
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/product", product);
app.use("/user", user);
app.use("/comment", comment);
app.use("/like", like);

mongoose.connect(
  "mongodb+srv://bac:0122468798Bac@user.lkm6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("connect to mongoDB");
  }
);

app.listen(PORT, () => {
  console.log("Start with port 5000");
});
