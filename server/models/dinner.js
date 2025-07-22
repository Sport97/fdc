const mongoose = require("mongoose");

const dinnerSchema = new mongoose.Schema({
  food: String,
  date: String,
  host: String,
  guest: String,
});

module.exports = mongoose.model("Dinner", dinnerSchema);
