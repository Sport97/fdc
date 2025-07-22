var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var index = require("./server/routes/app");
var app = express();
// var sequenceGenerator = require("./server/routes/sequenceGenerator");

const port = process.env.PORT || "3000";
const server = http.createServer(app);
const calendarRoutes = require("./server/routes/calendar");
const dinnerRoutes = require("./server/routes/dinners");
const shoppingRoutes = require("./server/routes/shopping");

app.set("port", port);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(logger("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// app.use(express.static(path.join(__dirname, "dist/cms/browser")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/cms/browser/index.html"));
// });

mongoose
  .connect("mongodb://localhost:27017/fdc", {})
  .then(async () => {
    console.log("Connected to database");

    // await sequenceGenerator.init();
    // console.log("SequenceGenerator initialized.");

    app.use("/", index);
    // app.use("/calendar", calendarRoutes);
    app.use("/dinners", dinnerRoutes);
    // app.use("/shopping", shoppingRoutes);

    server.listen(port, () => {
      console.log("API running on localhost: " + port);
    });
  })
  .catch((err) => {
    console.error("Connection failed: " + err);
  });
