const mongoose = require("mongoose");

const boosterInfoSchema = new mongoose.Schema(
  {
    booster_name: {type: String, require: true, default: "booster-info"},
    current_up_level: Number,
    current_up_level_index: Number, // 2nd less than current_up_level_limit or not
    current_down_level: Number,
    current_down_level_index: Number, // 1st less than 3 or not
    current_up_level_limit: Number, // 2nd geter than current_up_level_index or not
    this_index: Number, // total index count in down level
    tree_history: Array,
  },
  { timestamps: true }
);

const  BoosterInfo = new mongoose.model("BoosterInfo", boosterInfoSchema);

module.exports = BoosterInfo;