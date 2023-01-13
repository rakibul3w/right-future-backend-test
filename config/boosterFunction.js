const BoosterIncome = require("../models/booster-trial/boosterIncomeModel");
const BoosterInfo = require("../models/booster-trial/boosterInfoModel");
const Booster = require("../models/booster-trial/boosterModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const generateString = require("./generateRandomString");

const boosterFunction = async (user_id) => {
  try {
    try {
      // Useful variable initialization
      // user info
      const user = await User.findOne({ user_id });
      // Autopool Information
      const boosterInfo = await BoosterInfo.findOne({
        booster_name: "booster-info",
      });
      // this user booser
      const thisUserBooster = await Booster.find({ user_id });
      // conditions --->>
      if (user.topup_status) {
        // check booster exist or not
        // if not exist then create first document for booster
        if (!boosterInfo?.booster_name) {
          // create first document
          await BoosterInfo.create({
            booster_name: "booster-info",
            current_up_level: 1,
            current_up_level_index: 1,
            current_down_level: 1,
            current_down_level_index: 0,
            current_up_level_limit: 1,
            this_index: 0,
            tree_history: [
              {
                user_id,
                up_level: 1,
                down_level: 1,
                parent: "root",
                parent_index: 0,
                this_child_index: 1,
                this_index: 0,
                booster_index: thisUserBooster?.length + 1,
              },
            ],
          });

          // create autopool one document
          await Booster.create({
            user_id,
            top1: "root",
            top1_index: 0,
            top2: "root",
            top2_index: 0,
            booster_index: 1,
          });
        } else {
          let current_down_level_child;
          let recent_user;
          if (boosterInfo?.current_up_level > 2) {
            const recent_u = boosterInfo?.tree_history?.filter(
              (p) =>
                p.down_level === boosterInfo?.current_up_level &&
                boosterInfo?.current_up_level_index === p.this_index
            );
            recent_user = recent_u;
          } else {
            const recent_u = boosterInfo?.tree_history?.filter(
              (p) =>
                p.down_level === boosterInfo?.current_up_level &&
                boosterInfo?.current_up_level_index === p.this_child_index
            );
            recent_user = recent_u;
          }
          current_down_level_child = boosterInfo?.tree_history?.filter(
            (p) => p.parent === recent_user[0]?.user_id
          );

          // this is only condition when current parent will be stay as next current parent
          if (current_down_level_child?.length < 4) {
            // console.log("95 recent user ", recent_user)
            // console.log("96 current downline ", current_down_level_child)
            const top2Info = boosterInfo?.tree_history?.filter(
              (p) =>
                recent_user[0]?.parent === p?.user_id &&
                p?.this_child_index === recent_user[0]?.parent_index
            );
            let top2_parent = recent_user[0]?.parent;
            let top2_booster_index = top2Info[0]?.booster_index;
            console.log("222 top2 info ", user_id);
            console.log("222 top2 info ", top2Info);
            let current_parent = recent_user[0]?.user_id;
            let top1_booster_index = recent_user[0]?.booster_index;
            if (
              recent_user[0]?.parent === "root" &&
              boosterInfo?.current_down_level_index === 0
            ) {
              await BoosterInfo.findOneAndUpdate(
                { booster_name: "booster-info" },
                {
                  $set: {
                    current_up_level: boosterInfo?.current_up_level,
                    current_up_level_index: boosterInfo?.current_up_level_index,
                    current_down_level: boosterInfo?.current_down_level + 1,
                    current_down_level_index:
                      boosterInfo.current_down_level_index + 1,
                    current_up_level_limit: boosterInfo?.current_up_level_limit,
                    this_index: boosterInfo?.this_index + 1,
                    tree_history: [
                      ...boosterInfo?.tree_history,
                      {
                        user_id,
                        up_level: boosterInfo?.current_up_level,
                        down_level: boosterInfo?.current_down_level + 1,
                        parent: current_parent,
                        parent_index: recent_user[0]?.this_child_index,
                        this_child_index:
                          boosterInfo?.current_down_level_index + 1,
                        this_index: boosterInfo?.this_index + 1,
                        booster_index: thisUserBooster?.length + 1,
                      },
                    ],
                  },
                }
              );
            } else {
              await BoosterInfo.findOneAndUpdate(
                { booster_name: "booster-info" },
                {
                  $set: {
                    current_up_level: boosterInfo?.current_up_level,
                    current_up_level_index: boosterInfo?.current_up_level_index,
                    current_down_level: boosterInfo?.current_down_level,
                    current_down_level_index:
                      boosterInfo.current_down_level_index + 1,
                    current_up_level_limit: boosterInfo?.current_up_level_limit,
                    this_index: boosterInfo?.this_index + 1,
                    tree_history: [
                      ...boosterInfo?.tree_history,
                      {
                        user_id,
                        up_level: boosterInfo?.current_up_level,
                        down_level: boosterInfo?.current_down_level,
                        parent: current_parent,
                        parent_index: recent_user[0]?.this_child_index,
                        this_child_index:
                          boosterInfo?.current_down_level_index + 1,
                        this_index: boosterInfo?.this_index + 1,
                        booster_index: thisUserBooster?.length + 1,
                      },
                    ],
                  },
                }
              );
            }
            // find that user already exist any boster or not
            const existingBooster = await Booster.find({ user_id });
            const existingtop1Booster = await Booster.find({
              user_id: current_parent,
            });
            const existingtop2Booster = await Booster.find({
              user_id: top2_parent,
            });
            // create booster document
            await Booster.create({
              user_id,
              top1: current_parent,
              top1_index: top1_booster_index,
              top2: top2_parent,
              top2_index: top2_booster_index,
              booster_index: existingBooster?.length + 1,
            });

            // update top1 wallet
            await Wallet.findOneAndUpdate(
              { user_id: current_parent },
              {
                $inc: {
                  booster_income: +2,
                  total_income: +2,
                },
              }
            );
            await BoosterIncome.create({
              user_id: current_parent,
              transaction_id: generateString(),
              amount: 2,
              income_from: user_id,
            });

            // update top2 wallet
            await Wallet.findOneAndUpdate(
              { user_id: top2_parent },
              {
                $inc: {
                  booster_income: +2,
                  total_income: +2,
                },
              }
            );
            await BoosterIncome.create({
              user_id: top2_parent,
              transaction_id: generateString(),
              amount: 2,
              income_from: user_id,
            });
          } else {
            // check up level corss it's inedx limit or not
            // if it's not corss it's index limit then swtich up level index to +1 and make that index as current head node
            // if it's cross it's limit then then switch to it's down line find that down line's 1st index and make it current head node
            if (
              boosterInfo?.current_up_level_index !==
              boosterInfo?.current_up_level_limit
            ) {
              // here if up level is not corss the index limit
              const current_parent = boosterInfo?.tree_history?.filter(
                (p) =>
                  boosterInfo?.current_up_level === p?.down_level &&
                  p?.this_index === boosterInfo?.current_up_level_index + 1
              );
              let top1_booster_index = current_parent[0]?.booster_index;
              // console.log("146 curret_parent ", current_parent)
              const top2_parent = current_parent[0]?.parent;
              const top2Info = boosterInfo?.tree_history?.filter(
                (p) =>
                  current_parent[0]?.parent === p?.user_id &&
                  p?.this_child_index === current_parent[0]?.parent_index
              );
              let top2_booster_index = top2Info[0]?.booster_index;
              await BoosterInfo.findOneAndUpdate(
                { booster_name: "booster-info" },
                {
                  $set: {
                    current_up_level: boosterInfo?.current_up_level,
                    current_up_level_index:
                      boosterInfo?.current_up_level_index + 1,
                    current_down_level: boosterInfo?.current_down_level,
                    current_down_level_index:
                      boosterInfo?.current_down_level_index < 4
                        ? boosterInfo?.current_down_level_index + 1
                        : 1,
                    current_up_level_limit: boosterInfo?.current_up_level_limit,
                    this_index: boosterInfo?.this_index + 1,
                    tree_history: [
                      ...boosterInfo?.tree_history,
                      {
                        user_id,
                        up_level: boosterInfo?.current_up_level,
                        down_level: boosterInfo?.current_down_level,
                        parent: current_parent[0]?.user_id,
                        parent_index: current_parent[0]?.this_child_index,
                        this_child_index:
                          boosterInfo?.current_down_level_index < 4
                            ? boosterInfo?.current_down_level_index + 1
                            : 1,
                        this_index: boosterInfo?.this_index + 1,
                        booster_index: thisUserBooster?.length + 1,
                      },
                    ],
                  },
                }
              );

              // find that user already exist any boster or not
              const existingBooster = await Booster.find({ user_id });
              const existingtop1Booster = await Booster.find({
                user_id: current_parent[0]?.user_id,
              });
              const existingtop2Booster = await Booster.find({
                user_id: top2_parent,
              });
              // create autopool one document
              await Booster.create({
                user_id,
                top1: current_parent[0]?.user_id,
                top1_index: top1_booster_index,
                top2: top2_parent,
                top2_index: top2_booster_index,
                booster_index: existingBooster?.length + 1,
              });

              // update top1 wallet
              await Wallet.findOneAndUpdate(
                { user_id: current_parent[0]?.user_id },
                {
                  $inc: {
                    booster_income: +2,
                    total_income: +2,
                  },
                }
              );
              await BoosterIncome.create({
                user_id: current_parent[0]?.user_id,
                transaction_id: generateString(),
                amount: 2,
                income_from: user_id,
              });
              // update top2 wallet
              await Wallet.findOneAndUpdate(
                { user_id: top2_parent },
                {
                  $inc: {
                    booster_income: +2,
                    total_income: +2,
                  },
                }
              );
              await BoosterIncome.create({
                user_id: top2_parent,
                transaction_id: generateString(),
                amount: 2,
                income_from: user_id,
              });
            } else {
              // else up level corss it's index limit
              const previous_parent = boosterInfo?.tree_history?.filter(
                (p) =>
                  boosterInfo?.current_up_level === p?.down_level &&
                  p.this_child_index === 1
              );
              const current_parent = boosterInfo?.tree_history?.filter(
                (c) =>
                  c?.parent === previous_parent[0]?.user_id &&
                  c?.this_child_index === 1
              );
              let top1_booster_index = current_parent[0]?.booster_index;
              const top2_parent = current_parent[0]?.parent;
              const top2Info = boosterInfo?.tree_history?.filter(
                (p) =>
                  current_parent[0]?.parent === p?.user_id &&
                  p?.this_child_index === current_parent[0]?.parent_index
              );
              let top2_booster_index = top2Info[0]?.booster_index;
              // console.log("192 previous parent ", previous_parent[0]?.user_id)
              // console.log("192 current parent ", current_parent[0]?.user_id)
              // console.log("192 top2 parent ", current_parent[0]?.parent)
              await BoosterInfo.findOneAndUpdate(
                { booster_name: "booster-info" },
                {
                  $set: {
                    current_up_level: current_parent[0]?.down_level,
                    current_up_level_index: current_parent[0]?.this_index,
                    current_down_level: current_parent[0]?.down_level + 1,
                    current_down_level_index: 1,
                    current_up_level_limit: Math.pow(
                      4,
                      current_parent[0]?.down_level - 1
                    ),
                    this_index: 1,
                    tree_history: [
                      ...boosterInfo?.tree_history,
                      {
                        user_id,
                        up_level: current_parent[0]?.down_level,
                        down_level: current_parent[0]?.down_level + 1,
                        parent: current_parent[0]?.user_id,
                        parent_index: current_parent[0]?.this_child_index,
                        this_child_index: 1,
                        this_index: 1,
                        booster_index: thisUserBooster?.length + 1,
                      },
                    ],
                  },
                }
              );

              // find that user already exist any boster or not
              const existingBooster = await Booster.find({ user_id });
              const existingtop1Booster = await Booster.find({
                user_id: current_parent[0]?.user_id,
              });
              const existingtop2Booster = await Booster.find({
                user_id: top2_parent,
              });
              // create autopool one document
              await Booster.create({
                user_id,
                top1: current_parent[0]?.user_id,
                top1_index: top1_booster_index,
                top2: top2_parent,
                top2_index: top2_booster_index,
                booster_index: existingBooster?.length + 1,
              });

              // update top1 wallet
              await Wallet.findOneAndUpdate(
                { user_id: current_parent[0]?.user_id },
                {
                  $inc: {
                    booster_income: +2,
                    total_income: +2,
                  },
                }
              );

              await BoosterIncome.create({
                user_id: current_parent[0]?.user_id,
                transaction_id: generateString(),
                amount: 2,
                income_from: user_id,
              });

              // update top2 wallet
              await Wallet.findOneAndUpdate(
                { user_id: top2_parent },
                {
                  $inc: {
                    booster_income: +2,
                    total_income: +2,
                  },
                }
              );

              await BoosterIncome.create({
                user_id: top2_parent,
                transaction_id: generateString(),
                amount: 2,
                income_from: user_id,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = boosterFunction;
