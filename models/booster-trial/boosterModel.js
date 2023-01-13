const mongoose = require("mongoose");

const boosterSchema = new mongoose.Schema(
  {
    user_id: { type: String, require: true },
    top1: String,
    top1_index: Number,
    top2: String,
    top2_index: Number,
    booster_index: Number,
  },
  { timestamps: true }
);

const Booster = new mongoose.model("Booster", boosterSchema);

module.exports = Booster;
