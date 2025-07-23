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

router.put("/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name } = req.body;
    const { amount } = req.body;

    const shopping = await shoppingModel.findById(_id);
    if (!shopping) {
      return res.status(404).json({ message: "Shopping entry not found" });
    }

    const item = shopping.items._id(item);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.name = name;
    item.amount = amount;
    await shopping.save();

    res.status(200).json({ message: "Item updated", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:entryId/items/:itemId", async (req, res) => {
  try {
    const entry = await shoppingModel.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    entry.items = entry.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await entry.save();

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
