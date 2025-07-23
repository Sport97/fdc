var express = require("express");
var router = express.Router();
const dinnerModel = require("../models/dinner");

router.get("/", (req, res, next) => {
  dinnerModel
    .find()
    .then((dinnerData) => {
      res.status(200).json(dinnerData);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while fetching dinners.",
      });
    });
});

module.exports = router;
