const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema(
  {
    food: String,
    date: String,
    host: String,
    guest: String,
  },
  {
    collection: "calendar",
  }
);

module.exports = mongoose.model("Calendar", calendarSchema);
