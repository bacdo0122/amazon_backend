const express = require("express");
const like = require("../../model/like");
const router = express.Router();

router.get("/:productID/:commentID", async (req, res) => {
  try {
    const getlikes = await like
      .find({
        productID: req.params.productID,

        commentID: req.params.commentID,
      })
      .populate("userID")
      .populate("commentID")
      .populate("productID");
    res.status(200).json(getlikes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.post("/", async (req, res) => {
  const newLike = new like({
    userID: req.body.userID,
    commentID: req.body.commentID,
    productID: req.body.productID,
  });
  try {
    const createNewLike = await newLike.save();
    res.status(200).json(createNewLike);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const getlikes = await like.remove({ _id: req.params.id });

    res.status(200).json(getlikes);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
module.exports = router;
