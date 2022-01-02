const express = require("express");
const comment = require("../../model/comment");
const router = express.Router();

router.post("/", async (req, res) => {
  const newComment = new comment({
    star: req.body.star,
    context: req.body.context,
    type: req.body.type,
    createAt: req.body.createAt,
    like: req.body.like,
    product: req.body.product,
    user: req.body.user,
  });
  try {
    const createNewComment = await newComment.save();
    res.status(200).json(createNewComment);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:productID", async (req, res) => {
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const startIndex = (page - 1) * 1;
  try {
    const getComment = await comment
      .find({ product: req.params.productID })
      .limit(1)
      .skip(startIndex)
      .populate("product")
      .populate("user");

    res.status(200).json(getComment);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.get("/:productID/AllComment", async (req, res) => {
  try {
    const getComment = await comment
      .find({ product: req.params.productID })
      .populate("product")
      .populate("user");

    res.status(200).json(getComment);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
