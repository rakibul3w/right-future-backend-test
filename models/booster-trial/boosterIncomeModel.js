const mongoose = require("mongoose");

const boosterIncomeSchema = new mongoose.Schema(
  {
    user_id: String,
    transaction_id: { type: String, unique: true },
    amount: { type: Number },
    income_from: { type: String },
  },
  { timestamps: true }
);

const BoosterIncome = new mongoose.model("BoosterIncome", boosterIncomeSchema);

module.exports = BoosterIncome;
