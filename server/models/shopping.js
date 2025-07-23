const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema(
  {
    name: String,
    ammount: Number,
  },
  {
    collection: "shopping",
  }
);

module.exports = mongoose.model("Shopping", shoppingSchema);
