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

router.post("/", (req, res) => {
  const { date, food, host, guest } = req.body;
  const dinner = new dinnerModel({ date, food, host, guest });

  dinner
    .save()
    .then((createdDinner) => {
      res.status(201).json({
        message: "Dinner added successfully",
        dinner: createdDinner,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Adding dinner failed",
        error,
      });
    });
});

router.put("/:id", (req, res) => {
  console.log("Request body:", req.body);
  dinnerModel
    .findByIdAndUpdate(
      req.params.id,
      {
        date: req.body.date,
        food: req.body.food,
        host: req.body.host,
        guest: req.body.guest,
      },
      { new: true }
    )
    .then((updatedDinner) => {
      if (!updatedDinner) {
        return res.status(404).json({ message: "Dinner entry not found" });
      }
      res.status(200).json(updatedDinner);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating dinner", error: err });
    });
});

router.delete("/:id", (req, res) => {
  dinnerModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Dinner entry not found" });
      }
      res.status(200).json({ message: "Dinner deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting dinner failed", error: err });
    });
});

module.exports = router;
