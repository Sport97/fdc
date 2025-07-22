var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "FDC API",
    available_routes: {
      "/calendar": "Documents Route",
      "/documents": "Messages Route",
      "/shopping": "Contacts Route",
    },
  });
});

module.exports = router;
