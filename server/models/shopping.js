const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    collection: "shopping",
  }
);

module.exports = mongoose.model("Shopping", shoppingSchema);
