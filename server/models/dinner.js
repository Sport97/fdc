const mongoose = require("mongoose");

const dinnerSchema = new mongoose.Schema({
  date: { type: String, requried: true },
  food: { type: String, requried: true },
  host: { type: String, requried: true },
  guest: { type: String, requried: true },
});

module.exports = mongoose.model("Dinner", dinnerSchema);
