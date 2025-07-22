var express = require("express");
var router = express.Router();
const Dinner = require("../models/dinner");

// GET all dinners
router.get("/", async (req, res) => {
  try {
    const dinners = await Dinner.find();
    res.status(200).json(dinners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
