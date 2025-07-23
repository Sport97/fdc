var express = require("express");
var router = express.Router();
const calendarModel = require("../models/calendar");

router.get("/", (req, res, next) => {
  calendarModel
    .find()
    .then((calendarData) => {
      res.status(200).json(calendarData);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "An error occurred while fetching calendar.",
      });
    });
});

module.exports = router;
