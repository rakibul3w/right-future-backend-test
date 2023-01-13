const mongoose = require("mongoose");

const autopoolLockIncomeSchema = new mongoose.Schema(
  {
    autopool_name: { type: String, require: true },
    user_id: { type: String },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AutopoolLockIncome = new mongoose.model(
  "AutopoolLockIncome",
  autopoolLockIncomeSchema
);

module.exports = AutopoolLockIncome;
