var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "FDC API",
    available_routes: {
      "http://localhost:3000/calendar": "Calednar Route",
      "http://localhost:3000/dinners": "Dinners Route",
      "http://localhost:3000/shopping": "Shopping Route",
    },
  });
});

module.exports = router;
