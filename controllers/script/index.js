const generateString = require("../../config/generateRandomString");
const { generateToken } = require("../../config/generateToken");
const updateLevel = require("../../config/updateLevel");
const BoosterIncome = require("../../models/booster-trial/boosterIncomeModel");
const BoosterInfo = require("../../models/booster-trial/boosterInfoModel");
const Booster = require("../../models/booster-trial/boosterModel");
const GiftedUser = require("../../models/giftedUserModel");
const Level = require("../../models/levelModel");
const User = require("../../models/userModel");
const Wallet = require("../../models/walletModel");

const testBooster = async (req, res) => {
  try {
    for (var i = 0; i < 10; i++) {
      // register start
      let lastUser;
      let lastUserName;
      const useri = await User.find({});
      if (useri?.length <= 0) {
        lastUser = "ADMIN";
        lastUserName = "admin";
      } else {
        lastUser = useri[useri?.length - 1]?.user_id;
        lastUserName = useri[useri?.length - 1]?.name;
      }
      const name = `user${i}`;
      const email = `user${i + 1}@mail.com`;
      const password = "123456aA@";
      const mobile = "02168461516";
      const sponsor_id = lastUser;
      const sponsor_name = lastUserName;
      let initialTrx = generateString(12);
      let randomUserId;

      const allUser = await User.find({});
      const lastUserID = allUser[allUser.length - 1]?.user_id.split("RF")[1];
      if (lastUserID) {
        randomUserId = "RF00" + (parseFloat(lastUserID) + 1);
      } else if (allUser.length === 1) {
        randomUserId = "RF001";
      } else {
        randomUserId = "RF00" + (allUser.length + 1);
      }

      const creentDate = new Date().getTime();
      const user = await User.create({
        name: name,
        user_id: randomUserId,
        email: email,
        password: password,
        mobile: mobile,
        sponsor_id: sponsor_id,
        sponsor_name: sponsor_name,
        token: generateToken(randomUserId),
        trx_password: initialTrx,
        wallet_address: "",
        gifted_date: creentDate,
        join_date: creentDate,
        topup_status: true,
      });
      if (user) {
        // send successfull email
        // sendConfrimRegistrationMail(user, initialTrx, user.user_id);

        // create wallet
        await Wallet.create({
          user_id: randomUserId,
          sponsor_id: sponsor_id,
          derect_income: 0,
          inderect_income: 0,
          direct_fund_transfer_income: 0,
          direct_withdraw_income: 0,
          booster_income: 0,
          autopool_income: 0,
          reward_income: 0,
          gift_income: 0,
          user_activation_income: 0,
          current_amount: 0,
          total_income: 0,
          total_deposite: 0,
          total_withdraw: 0,
          wallet_address: "",
        });

        await GiftedUser.create({
          user_id: randomUserId,
          user_name: name,
          history: [],
          join_date: new Date().getTime(),
        });

        // create level new for user
        await Level.create({
          name: name,
          user_id: randomUserId,
          email: email,
          sponsor_id: sponsor_id,
          level: [],
        });
        const level1 = await Level.findOne({ user_id: sponsor_id });
        const level2 = await Level.findOne({ user_id: level1?.sponsor_id });
        const level3 = await Level.findOne({ user_id: level2?.sponsor_id });
        const level4 = await Level.findOne({ user_id: level3?.sponsor_id });
        const level5 = await Level.findOne({ user_id: level4?.sponsor_id });
        const level6 = await Level.findOne({ user_id: level5?.sponsor_id });
        const level7 = await Level.findOne({ user_id: level6?.sponsor_id });
        const level8 = await Level.findOne({ user_id: level7?.sponsor_id });
        const user = await User.findOne({ user_id: randomUserId });
        // Update Level 1
        if (level1) {
          updateLevel(level1, user, 1);
        }
        // update level 2
        if (level2) {
          updateLevel(level2, user, 2);
        }

        // update level 3
        if (level3) {
          updateLevel(level3, user, 3);
        }
        // update level 4
        if (level4) {
          updateLevel(level4, user, 4);
        }
        // update level 5
        if (level5) {
          updateLevel(level5, user, 5);
        }
        // Update Level 6
        if (level6) {
          updateLevel(level6, user, 6);
        }
        // update level 7
        if (level7) {
          updateLevel(level7, user, 7);
        }
        // update level 8
        if (level8) {
          updateLevel(level8, user, 8);
        }

        // --------- Register End ---------//

        // ----------- Booster Start ------//

        // Useful variable initialization
        // user info
        // const user = await User.findOne({ user_id: randomUserId });
        // Autopool Information
        const boosterInfo = await BoosterInfo.findOne({
          booster_name: "booster-info",
        });
        // this user booser
        const thisUserBooster = await Booster.find({ user_id: randomUserId });
        // conditions --->>
        if (user.topup_status) {
          const user_id = randomUserId;
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
                      current_up_level_index:
                        boosterInfo?.current_up_level_index,
                      current_down_level: boosterInfo?.current_down_level + 1,
                      current_down_level_index:
                        boosterInfo.current_down_level_index + 1,
                      current_up_level_limit:
                        boosterInfo?.current_up_level_limit,
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
                      current_up_level_index:
                        boosterInfo?.current_up_level_index,
                      current_down_level: boosterInfo?.current_down_level,
                      current_down_level_index:
                        boosterInfo.current_down_level_index + 1,
                      current_up_level_limit:
                        boosterInfo?.current_up_level_limit,
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
                // console.log("364 top2 info ", user_id);
                // console.log("364 top2 info ", top2Info);
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
                      current_up_level_limit:
                        boosterInfo?.current_up_level_limit,
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
                console.log("471 top2 info ", user_id);
                console.log("471 top2 info ", top2Info);
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
      }

      // --------- end --------- //

      console.log(i);
    }
    console.log("Done");
  } catch (error) {
    console.log(error);
  }
};

module.exports = testBooster;
