const express = require("express");
const router = express.Router();
const product = require("../../model/product");
const Price = (price) => {
  switch (price) {
    case "Under $25": {
      return { $lt: parseInt(25) };
    }
    case "$25 to $50": {
      return { $gt: 25, $lt: 50 };
    }
    case "$50 to $100": {
      return { $gt: 50, $lt: 100 };
    }
    case "$100 to $200": {
      return { $gt: 100, $lt: 200 };
    }
    case "$200 to Above": {
      return { $gt: 200 };
    }
    default: {
      const min_price = price.slice(1, price.indexOf(" "));
      const max_price = price.slice(price.lastIndexOf(" ") + 2, price.length);
      return { $gt: parseFloat(min_price), $lt: parseFloat(max_price) };
    }
  }
};
router.get("/myProduct/:author", async (req, res) => {
  console.log(req.params.author);
  try {
    const data = await product.find({ color: "black" });

    res.status(200).json({ data: data, totalPage1: (await data).length });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.get("/", async (req, res) => {
  let query = {};
  if (req.query.star)
    query["star.number"] = { $gte: parseFloat(req.query.star) };
  if (req.query.brand) query["brand"] = req.query.brand;
  if (req.query.price) {
    console.log(Price(req.query.price));
    query["dolar"] = Price(req.query.price);
  }

  if (req.query.name)
    query["name"] = {
      $regex: new RegExp(".*" + req.query.name + ".*", "i"),
    };

  if (req.query.color) query["color"] = req.query.color;
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const startIndex = (page - 1) * 8;
  try {
    let getData = [];
    if (
      !req.query.star &&
      !req.query.brand &&
      !req.query.price &&
      !req.query.color &&
      !req.query.name
    )
      getData = await product.find().limit(8).skip(startIndex);
    else {
      getData = await product.find(query).limit(8).skip(startIndex);
    }
    res
      .status(200)
      .json({ data: getData, totalPage: (await product.find(query)).length });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const getProduct = await product.find({ _id: req.params.id });
    res.json(getProduct);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.post("/", async (req, res) => {
  const products = new product({
    title: req.body.title,
    name: req.body.name,
    image: req.body.image,
    count: req.body.count,
    star: req.body.star,
    numberVote: req.body.numberVote,
    dolar: req.body.dolar,
    cent: req.body.cent,
    per: req.body.per,
    discount: req.body.discount,
    prime: req.body.prime,
    time: req.body.time,
    remain: req.body.remain,
    newDolarOffer: req.body.newDolarOffer,
    titleOffer: req.body.titleOffer,
    content: req.body.content,
    color: req.body.color,
    mutltiColor: req.body.mutltiColor,
    brand: req.body.brand,
  });

  try {
    const addProducts = await products.save();
    res.json(addProducts);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const remove = await product.remove({ _id: req.params.id });
    res.json(remove);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const update = await product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          dolar: req.body.dolar,
          cent: req.body.cent,
          brand: req.body.brand,
          content: req.body.content,
          time: req.body.time,
          color: req.body.color,
          numberVote: req.body.numberVote,
        },
      }
    );
    res.json(update);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
module.exports = router;
