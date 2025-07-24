var express = require("express");
var router = express.Router();
const shoppingModel = require("../models/shopping");

router.get("/", (req, res, next) => {
  shoppingModel
    .find()
    .then((shoppingData) => {
      res.status(200).json(shoppingData);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while fetching shopping.",
      });
    });
});

router.post("/", async (req, res) => {
  const shopping = new shoppingModel({
    name: req.body.name,
    amount: req.body.amount,
  });
  try {
    const result = await shopping.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", (req, res) => {
  console.log("Request body:", req.body);
  shoppingModel
    .findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        amount: req.body.amount,
      },
      { new: true }
    )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).json({ message: "Shopping entry not found" });
      }
      res.status(200).json(updatedItem);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating item", error: err });
    });
});

router.delete("/:id", (req, res) => {
  shoppingModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Shopping entry not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting item failed", error: err });
    });
});

module.exports = router;
