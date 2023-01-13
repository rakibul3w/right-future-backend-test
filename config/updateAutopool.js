const AdminWallet = require("../models/adminWalletModel");
const AutopoolEight = require("../models/autopool-trial/allAutopool/autopoolEightModel");
const AutopoolEleven = require("../models/autopool-trial/allAutopool/autopoolElevenModel");
const AutopoolFifteen = require("../models/autopool-trial/allAutopool/autopoolFifteenModel");
const AutopoolFive = require("../models/autopool-trial/allAutopool/autopoolFiveModel");
const AutopoolFour = require("../models/autopool-trial/allAutopool/autopoolFourModel");
const AutopoolFourteen = require("../models/autopool-trial/allAutopool/autopoolFourteenModel");
const AutopoolNine = require("../models/autopool-trial/allAutopool/autopoolNineModel");
const AutopoolSeven = require("../models/autopool-trial/allAutopool/autopoolSevenModel");
const AutopoolSix = require("../models/autopool-trial/allAutopool/autopoolSixModel");
const AutopoolSixteen = require("../models/autopool-trial/allAutopool/autopoolSixteenModel");
const AutopoolTen = require("../models/autopool-trial/allAutopool/autopoolTenModel");
const AutopoolThirteen = require("../models/autopool-trial/allAutopool/autopoolThirteenModel");
const AutopoolThree = require("../models/autopool-trial/allAutopool/autopoolThreeModel");
const AutopoolTwelve = require("../models/autopool-trial/allAutopool/autopoolTwelveModel");
const AutopoolTwo = require("../models/autopool-trial/allAutopool/autopoolTwoModel");
const AutopoolInfo = require("../models/autopool-trial/autopoolInfoModel");
const AutopoolLockIncome = require("../models/autopool-trial/autopoolLockIncome");
const AutopoolQueue = require("../models/autopool-trial/autopoolQueueModel");
const AutopoolSetting = require("../models/autopool-trial/autopoolSettingMode");
const RoyaltiIncome = require("../models/autopool-trial/royaltyModel");
const IncomeLevelUpdate = require("../models/incomeLevelUpdate");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const generateString = require("./generateRandomString");

const updateAutopool = async (autopoolNumber, user_id, Model) => {
  try {
    console.log(Model);
    // Useful variable initialization
    const value = {
      2: "autopool-two",
      3: "autopool-three",
      4: "autopool-four",
      5: "autopool-five",
      6: "autopool-six",
      7: "autopool-seven",
      8: "autopool-eight",
      9: "autopool-nine",
      10: "autopool-ten",
      11: "autopool-eleven",
      12: "autopool-twelve",
      13: "autopool-thirteen",
      14: "autopool-fourteen",
      15: "autopool-fifteen",
      16: "autopool-sixteen",
    };

    const upgradeAmount = {
      "autopool-two": 100,
      "autopool-three": 150,
      "autopool-four": 200,
      "autopool-five": 290,
      "autopool-six": 540,
      "autopool-seven": 1030,
      "autopool-eight": 2000,
      "autopool-nine": 3930,
      "autopool-ten": 7680,
      "autopool-eleven": 15470,
      "autopool-twelve": 30840,
      "autopool-thirteen": 61570,
      "autopool-fourteen": 123020,
      "autopool-fifteen": 245910,
    };

    const incomeAmount = {
      "autopool-two": 20,
      "autopool-three": 40,
      "autopool-four": 60,
      "autopool-five": 80,
      "autopool-six": 120,
      "autopool-seven": 240,
      "autopool-eight": 480,
      "autopool-nine": 960,
      "autopool-ten": 1920,
      "autopool-eleven": 3840,
      "autopool-twelve": 7680,
      "autopool-thirteen": 15360,
      "autopool-fourteen": 30720,
      "autopool-fifteen": 61440,
      "autopool-sixteen": 122880,
    };
    const autopoolModel = {
      2: AutopoolTwo,
      3: AutopoolThree,
      4: AutopoolFour,
      5: AutopoolFive,
      6: AutopoolSix,
      7: AutopoolSeven,
      8: AutopoolEight,
      9: AutopoolNine,
      10: AutopoolTen,
      11: AutopoolEleven,
      12: AutopoolTwelve,
      13: AutopoolThirteen,
      14: AutopoolFourteen,
      15: AutopoolFifteen,
      16: AutopoolSixteen,
    };

    const sponsorIncome = {
      "autopool-two": 5,
      "autopool-three": 10,
      "autopool-four": 15,
      "autopool-five": 20,
      "autopool-six": 25,
      "autopool-seven": 30,
      "autopool-eight": 35,
      "autopool-nine": 40,
      "autopool-ten": 45,
      "autopool-eleven": 50,
      "autopool-twelve": 55,
      "autopool-thirteen": 60,
      "autopool-fourteen": 65,
      "autopool-fifteen": 70,
      "autopool-sixteen": 75,
    };

    const AdminIncome = {
      "autopool-two": 45,
      "autopool-three": 90,
      "autopool-four": 135,
      "autopool-five": 180,
      "autopool-six": 265,
      "autopool-seven": 510,
      "autopool-eight": 995,
      "autopool-nine": 1960,
      "autopool-ten": 3885,
      "autopool-eleven": 7630,
      "autopool-twelve": 15415,
      "autopool-thirteen": 30780,
      "autopool-fourteen": 61505,
      "autopool-fifteen": 122950,
      "autopool-sixteen": 245835,
    };

    const lockPool = {
      2: "autopool_two",
      3: "autopool_three",
      4: "autopool_four",
      5: "autopool_five",
      6: "autopool_six",
      7: "autopool_seven",
      8: "autopool_eight",
      9: "autopool_nine",
      10: "autopool_ten",
      11: "autopool_eleven",
    };

    // console.log("Next model ", autopoolModel[autopoolNumber+1])
    // user info
    const user = await User.findOne({ user_id });
    // Autopool Information
    const autopoolInfo = await AutopoolInfo.findOne({
      autopool_name: value[autopoolNumber],
    });
    // system anutoppol setting
    const autopoolSetting = await AutopoolSetting.findOne({
      autopool_name: value[autopoolNumber],
    });
    // console.log(autopoolInfo)
    // conditions --->>
    if (user.topup_status) {
      // check system autopool setting
      if (!autopoolSetting?.status) {
        // find out autopool one queue
        const autopoolQueue = await AutopoolQueue.findOne({
          autopool_name: value[autopoolNumber],
        });
        if (!autopoolQueue?.autopool_name) {
          await AutopoolQueue.create({
            autopool_name: value[autopoolNumber],
            stack: [user_id],
          });
        } else {
          await AutopoolQueue.findOneAndUpdate(
            { autopool_name: value[autopoolNumber] },
            {
              $push: {
                stack: user_id,
              },
            }
          );
        }
        // res.status(400).json({message: "System autopool is off now by admin. Your id is now in queue to enter on autopool."})
      } else {
        // check autopool one exist or not
        // if not exist then create first document for outopool one
        if (!autopoolInfo?.autopool_name) {
          // create first document
          await AutopoolInfo.create({
            autopool_name: value[autopoolNumber],
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
                this_child_index: 1,
                this_index: 0,
              },
            ],
          });

          // create autopool one document
          await Model.create({
            user_id,
            top1: "root",
            top2: "root",
            child: [],
          });
          // update current autopool for that user
          await User.findOneAndUpdate(
            { user_id },
            {
              $set: {
                current_autopool: autopoolNumber,
              },
            }
          );

          // income level update
          // sponsor
          await Wallet.findOneAndUpdate(
            { user_id: user?.sponsor_id },
            {
              $inc: {
                level_update_income: +sponsorIncome[value[autopoolNumber]],
                total_income: +sponsorIncome[value[autopoolNumber]],
              },
            }
          );
          await IncomeLevelUpdate.create({
            user_id: user?.sponsor_id,
            transaction_id: generateString(),
            amount: sponsorIncome[value[autopoolNumber]],
            autopool: autopoolNumber,
            income_from: user_id,
          });
          // admin
          await AdminWallet.findOneAndUpdate(
            { user_id: "ADMIN" },
            {
              $inc: {
                level_update_income: +AdminIncome[value[autopoolNumber]],
                total_amount: +AdminIncome[value[autopoolNumber]],
              },
            }
          );
          await IncomeLevelUpdate.create({
            user_id: "ADMIN",
            transaction_id: generateString(),
            amount: AdminIncome[value[autopoolNumber]],
            autopool: autopoolNumber,
            income_from: user_id,
          });

          // Inser on Royalty
          if (autopoolNumber === 11) {
            RoyaltiIncome.create({
              user_id,
              status: true,
            });
          }

          // res.status(200).json({message: "successfull"})
        } else {
          // let current_current_parent;
          // let current_down_level_child;
          let current_down_level_child;
          let recent_user;
          if (autopoolInfo?.current_up_level > 2) {
            const recent_u = autopoolInfo?.tree_history?.filter(
              (p) =>
                p.down_level === autopoolInfo?.current_up_level &&
                autopoolInfo?.current_up_level_index === p.this_index
            );
            recent_user = recent_u;
          } else {
            const recent_u = autopoolInfo?.tree_history?.filter(
              (p) =>
                p.down_level === autopoolInfo?.current_up_level &&
                autopoolInfo?.current_up_level_index === p.this_child_index
            );
            recent_user = recent_u;
          }
          // const recent_user = autopoolInfo?.tree_history?.filter(p=> p.down_level === autopoolInfo?.current_up_level && autopoolInfo?.current_up_level_index === p.this_child_index )
          console.log("54 recent_user ", recent_user);
          // if(recent_user[0]?.parent === "root"){
          current_down_level_child = autopoolInfo?.tree_history?.filter(
            (p) => p.parent === recent_user[0]?.user_id
          );
          // }else{
          //     current_down_level_child = autopoolInfo?.tree_history?.filter(p=> p.parent === recent_user[0]?.parent)
          // }

          // this is only condition when current parent will be stay as next current parent
          if (current_down_level_child?.length < 3) {
            let top2_parent = recent_user[0]?.parent;
            let current_parent = recent_user[0]?.user_id;
            // if(recent_user[0]?.parent === "root"){
            //     current_parent = recent_user[0]?.user_id;
            //     const top_parent = autopoolInfo?.tree_history?.filter(f=> f.user_id === recent_user[0]?.parent);
            //     top2_parent = top_parent[0]?.parent
            // }else{
            //     current_parent = recent_user[0]?.parent;
            //     const top_parent = autopoolInfo?.tree_history?.filter(f=> f?.user_id === recent_user[0]?.parent);
            //     top2_parent = top_parent[0]?.parent
            // }
            console.log("74 current parent ", current_parent);
            console.log("75 top2 parent ", top2_parent);
            // aupdate autopool info
            if (
              recent_user[0]?.parent === "root" &&
              autopoolInfo?.current_down_level_index === 0
            ) {
              await AutopoolInfo.findOneAndUpdate(
                { autopool_name: value[autopoolNumber] },
                {
                  $set: {
                    current_up_level: autopoolInfo?.current_up_level,
                    current_up_level_index:
                      autopoolInfo?.current_up_level_index,
                    current_down_level: autopoolInfo?.current_down_level + 1,
                    current_down_level_index:
                      autopoolInfo.current_down_level_index + 1,
                    current_up_level_limit:
                      autopoolInfo?.current_up_level_limit,
                    this_index: autopoolInfo?.this_index + 1,
                    tree_history: [
                      ...autopoolInfo?.tree_history,
                      {
                        user_id,
                        up_level: autopoolInfo?.current_up_level,
                        down_level: autopoolInfo?.current_down_level + 1,
                        parent: current_parent,
                        this_child_index:
                          autopoolInfo?.current_down_level_index + 1,
                        this_index: autopoolInfo?.this_index + 1,
                      },
                    ],
                  },
                }
              );
            } else {
              await AutopoolInfo.findOneAndUpdate(
                { autopool_name: value[autopoolNumber] },
                {
                  $set: {
                    current_up_level: autopoolInfo?.current_up_level,
                    current_up_level_index:
                      autopoolInfo?.current_up_level_index,
                    current_down_level: autopoolInfo?.current_down_level,
                    current_down_level_index:
                      autopoolInfo.current_down_level_index + 1,
                    current_up_level_limit:
                      autopoolInfo?.current_up_level_limit,
                    this_index: autopoolInfo?.this_index + 1,
                    tree_history: [
                      ...autopoolInfo?.tree_history,
                      {
                        user_id,
                        up_level: autopoolInfo?.current_up_level,
                        down_level: autopoolInfo?.current_down_level,
                        parent: current_parent,
                        this_child_index:
                          autopoolInfo?.current_down_level_index + 1,
                        this_index: autopoolInfo?.this_index + 1,
                      },
                    ],
                  },
                }
              );
            }
            // create autopool one document
            await Model.create({
              user_id,
              top1: current_parent,
              top2: top2_parent,
              child: [],
            });
            // update current autopool for that user
            await User.findOneAndUpdate(
              { user_id },
              {
                $set: {
                  current_autopool: autopoolNumber,
                },
              }
            );

            // income level update
            // sponsor
            await Wallet.findOneAndUpdate(
              { user_id: user?.sponsor_id },
              {
                $inc: {
                  level_update_income: +sponsorIncome[value[autopoolNumber]],
                  total_income: +sponsorIncome[value[autopoolNumber]],
                },
              }
            );
            await IncomeLevelUpdate.create({
              user_id: user?.sponsor_id,
              transaction_id: generateString(),
              amount: sponsorIncome[value[autopoolNumber]],
              autopool: autopoolNumber,
              income_from: user_id,
            });
            // admin
            await AdminWallet.findOneAndUpdate(
              { user_id: "ADMIN" },
              {
                $inc: {
                  level_update_income: +AdminIncome[value[autopoolNumber]],
                  total_amount: +AdminIncome[value[autopoolNumber]],
                },
              }
            );
            await IncomeLevelUpdate.create({
              user_id: "ADMIN",
              transaction_id: generateString(),
              amount: AdminIncome[value[autopoolNumber]],
              autopool: autopoolNumber,
              income_from: user_id,
            });

            // Inser on Royalty
            if (autopoolNumber === 11) {
              RoyaltiIncome.create({
                user_id,
                status: true,
              });
            }

            // push this user to the top1 child array
            await Model.findOneAndUpdate(
              { user_id: current_parent },
              {
                $push: {
                  child: user_id,
                },
              }
            );
            // push this user to the top2 child array
            await Model.findOneAndUpdate(
              { user_id: top2_parent },
              {
                $push: {
                  child: user_id,
                },
              }
            );
            // distribute autopool income to top1 and top2 parent
            // ------------ //
            // top1
            const top1Account = await User.findOne({ user_id: current_parent });
            const top1Wallet = await Wallet.findOne({
              user_id: current_parent,
            });
            let matchedTop1;
            const queueTop1 = await AutopoolQueue.findOne({
              autopool_name: value[autopoolNumber + 1],
            });
            if (!queueTop1?.autopool_name) {
              matchedTop1 = [];
            } else {
              matchedTop1 = queueTop1?.stack?.filter(
                (m) => m === current_parent
              );
            }
            if (
              matchedTop1?.length === 0 &&
              autopoolNumber < 16 &&
              top1Account?.current_autopool <= autopoolNumber &&
              top1Wallet?.autopool_freez_income <
                upgradeAmount[value[autopoolNumber]]
            ) {
              let amount;
              let extraAmount;
              if (
                parseInt(top1Wallet?.autopool_freez_income) +
                  parseInt(incomeAmount[value[autopoolNumber]]) >
                parseInt(upgradeAmount[value[autopoolNumber]])
              ) {
                extraAmount =
                  parseInt(top1Wallet?.autopool_freez_income) +
                  parseInt(incomeAmount[value[autopoolNumber]]) -
                  parseInt(upgradeAmount[value[autopoolNumber]]);
                amount =
                  parseInt(upgradeAmount[value[autopoolNumber]]) -
                  parseInt(top1Wallet?.autopool_freez_income);
              } else {
                extraAmount = 0;
                amount = parseInt(incomeAmount[value[autopoolNumber]]);
              }
              await Wallet.findOneAndUpdate(
                { user_id: current_parent },
                {
                  $inc: {
                    autopool_freez_income: +parseInt(amount),
                  },
                }
              );

              //////
              // top1 direct list
              const top1Directs = await User.find({
                $and: [
                  { sponsor_id: top1Account?.user_id },
                  { topup_status: true },
                ],
              });
              if (
                top1Directs?.lenght >= 20 ||
                top1Directs?.length >= (autopoolNumber - 1) * 2
              ) {
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent },
                  {
                    $inc: {
                      autopool_income: +parseInt(extraAmount),
                      total_income: +parseInt(extraAmount),
                    },
                  }
                );
              } else {
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent },
                  {
                    $inc: {
                      autopool_lock_income: +parseInt(extraAmount),
                    },
                  }
                );

                // find aut0pool lock income document
                const existingLockIncome = await AutopoolLockIncome.findOne({
                  $and: [
                    { user_id: current_parent },
                    { autopool_name: value[autopoolNumber] },
                  ],
                });
                if (!existingLockIncome) {
                  await AutopoolLockIncome.create({
                    autopool_name: value[autopoolNumber],
                    user_id: current_parent,
                    amount: parseInt(extraAmount),
                  });
                } else {
                  await AutopoolLockIncome.findOneAndUpdate(
                    {
                      $and: [
                        { user_id: current_parent },
                        { autopool_name: value[autopoolNumber] },
                      ],
                    },
                    {
                      $inc: {
                        amount: +parseInt(extraAmount),
                      },
                    }
                  );
                }
              }
              //////
            } else {
              // top1 direct list
              const top1Directs = await User.find({
                $and: [
                  { sponsor_id: top1Account?.user_id },
                  { topup_status: true },
                ],
              });
              if (
                top1Directs?.lenght >= 20 ||
                top1Directs?.length >= (autopoolNumber - 1) * 2
              ) {
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent },
                  {
                    $inc: {
                      autopool_income: +parseInt(
                        incomeAmount[value[autopoolNumber]]
                      ),
                      total_income: +parseInt(
                        incomeAmount[value[autopoolNumber]]
                      ),
                    },
                  }
                );
              } else {
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent },
                  {
                    $inc: {
                      autopool_lock_income: +parseInt(
                        incomeAmount[value[autopoolNumber]]
                      ),
                    },
                  }
                );

                // find aut0pool lock income document
                const existingLockIncome = await AutopoolLockIncome.findOne({
                  $and: [
                    { user_id: current_parent },
                    { autopool_name: value[autopoolNumber] },
                  ],
                });
                if (!existingLockIncome) {
                  await AutopoolLockIncome.create({
                    autopool_name: value[autopoolNumber],
                    user_id: current_parent,
                    amount: parseInt(incomeAmount[value[autopoolNumber]]),
                  });
                } else {
                  await AutopoolLockIncome.findOneAndUpdate(
                    {
                      $and: [
                        { user_id: current_parent },
                        { autopool_name: value[autopoolNumber] },
                      ],
                    },
                    {
                      $inc: {
                        amount: +parseInt(incomeAmount[value[autopoolNumber]]),
                      },
                    }
                  );
                }
              }
            }

            // top2
            const top2Account = await User.findOne({ user_id: top2_parent });
            const top2Wallet = await Wallet.findOne({ user_id: top2_parent });
            let matchedTop2;
            const queueTop2 = await AutopoolQueue.findOne({
              autopool_name: value[autopoolNumber + 1],
            });
            if (!queueTop2?.autopool_name) {
              matchedTop2 = [];
            } else {
              matchedTop2 = queueTop2?.stack?.filter((m) => m === top2_parent);
            }
            if (
              matchedTop2?.length === 0 &&
              autopoolNumber < 16 &&
              top2Account?.current_autopool <= autopoolNumber &&
              top2Wallet?.autopool_freez_income <
                upgradeAmount[value[autopoolNumber]]
            ) {
              let amount;
              let extraAmount;
              if (
                parseInt(top2Wallet?.autopool_freez_income) +
                  parseInt(incomeAmount[value[autopoolNumber]]) >
                parseInt(upgradeAmount[value[autopoolNumber]])
              ) {
                extraAmount =
                  parseInt(top2Wallet?.autopool_freez_income) +
                  parseInt(incomeAmount[value[autopoolNumber]]) -
                  parseInt(upgradeAmount[value[autopoolNumber]]);
                amount =
                  parseInt(upgradeAmount[value[autopoolNumber]]) -
                  parseInt(top2Wallet?.autopool_freez_income);
              } else {
                extraAmount = 0;
                amount = parseInt(incomeAmount[value[autopoolNumber]]);
              }
              await Wallet.findOneAndUpdate(
                { user_id: top2_parent },
                {
                  $inc: {
                    autopool_freez_income: +parseInt(amount),
                  },
                }
              );

              /////
              // top2 direct list
              const top2Directs = await User.find({
                $and: [
                  { sponsor_id: top2Account?.user_id },
                  { topup_status: true },
                ],
              });
              if (
                top2Directs?.lenght >= 20 ||
                top2Directs?.length >= (autopoolNumber - 1) * 2
              ) {
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $inc: {
                      autopool_income: +parseInt(extraAmount),
                      total_income: +parseInt(extraAmount),
                    },
                  }
                );
              } else {
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $inc: {
                      autopool_lock_income: +parseInt(extraAmount),
                    },
                  }
                );

                // find aut0pool lock income document
                const existingLockIncome = await AutopoolLockIncome.findOne({
                  $and: [
                    { user_id: top2_parent },
                    { autopool_name: value[autopoolNumber] },
                  ],
                });
                if (!existingLockIncome) {
                  await AutopoolLockIncome.create({
                    autopool_name: value[autopoolNumber],
                    user_id: top2_parent,
                    amount: parseInt(extraAmount),
                  });
                } else {
                  await AutopoolLockIncome.findOneAndUpdate(
                    {
                      $and: [
                        { user_id: top2_parent },
                        { autopool_name: value[autopoolNumber] },
                      ],
                    },
                    {
                      $inc: {
                        amount: +parseInt(extraAmount),
                      },
                    }
                  );
                }
              }
              /////
            } else {
              // top2 direct list
              const top2Directs = await User.find({
                $and: [
                  { sponsor_id: top2Account?.user_id },
                  { topup_status: true },
                ],
              });
              if (
                top2Directs?.lenght >= 20 ||
                top2Directs?.length >= (autopoolNumber - 1) * 2
              ) {
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $inc: {
                      autopool_income: +parseInt(
                        incomeAmount[value[autopoolNumber]]
                      ),
                      total_income: +parseInt(
                        incomeAmount[value[autopoolNumber]]
                      ),
                    },
                  }
                );
              } else {
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $inc: {
                      autopool_lock_income: +parseInt(
                        incomeAmount[value[autopoolNumber]]
                      ),
                    },
                  }
                );

                // find aut0pool lock income document
                const existingLockIncome = await AutopoolLockIncome.findOne({
                  $and: [
                    { user_id: top2_parent },
                    { autopool_name: value[autopoolNumber] },
                  ],
                });
                if (!existingLockIncome) {
                  await AutopoolLockIncome.create({
                    autopool_name: value[autopoolNumber],
                    user_id: top2_parent,
                    amount: parseInt(incomeAmount[value[autopoolNumber]]),
                  });
                } else {
                  await AutopoolLockIncome.findOneAndUpdate(
                    {
                      $and: [
                        { user_id: top2_parent },
                        { autopool_name: value[autopoolNumber] },
                      ],
                    },
                    {
                      $inc: {
                        amount: +parseInt(incomeAmount[value[autopoolNumber]]),
                      },
                    }
                  );
                }
              }
            }
            // check sponsor's autopool automatic upgrade
            // top1
            const updateedWalletTop1 = await Wallet.findOne({
              user_id: current_parent,
            });
            if (
              autopoolNumber < 16 &&
              updateedWalletTop1?.autopool_freez_income >=
                upgradeAmount[value[autopoolNumber]] &&
              top1Account?.current_autopool <= autopoolNumber
            ) {
              updateAutopool(
                autopoolNumber + 1,
                top1Account?.user_id,
                autopoolModel[autopoolNumber + 1]
              );
              await Wallet.findOneAndUpdate(
                { user_id: current_parent },
                {
                  $set: {
                    autopool_freez_income: 0,
                  },
                }
              );
            }
            // top2
            const updateedWalletTop2 = await Wallet.findOne({
              user_id: top2_parent,
            });
            if (
              autopoolNumber < 16 &&
              updateedWalletTop2?.autopool_freez_income >=
                upgradeAmount[value[autopoolNumber]] &&
              top2Account?.current_autopool <= autopoolNumber
            ) {
              updateAutopool(
                autopoolNumber + 1,
                top2Account?.user_id,
                autopoolModel[autopoolNumber + 1]
              );
              await Wallet.findOneAndUpdate(
                { user_id: top2_parent },
                {
                  $set: {
                    autopool_freez_income: 0,
                  },
                }
              );
            }
            // res.status(200).json({message: "successfull"})
          } else {
            // check up level corss it's inedx limit or not
            // if it's not corss it's index limit then swtich up level index to +1 and make that index as current head node
            // if it's cross it's limit then then switch to it's down line find that down line's 1st index and make it current head node
            if (
              autopoolInfo?.current_up_level_index !==
              autopoolInfo?.current_up_level_limit
            ) {
              // here if up level is not corss the index limit
              const current_parent = autopoolInfo?.tree_history?.filter(
                (p) =>
                  autopoolInfo?.current_up_level === p?.down_level &&
                  p?.this_index === autopoolInfo?.current_up_level_index + 1
              );
              console.log("146 curret_parent ", current_parent);
              const top2_parent = current_parent[0]?.parent;
              await AutopoolInfo.findOneAndUpdate(
                { autopool_name: value[autopoolNumber] },
                {
                  $set: {
                    current_up_level: autopoolInfo?.current_up_level,
                    current_up_level_index:
                      autopoolInfo?.current_up_level_index + 1,
                    current_down_level: autopoolInfo?.current_down_level,
                    current_down_level_index:
                      autopoolInfo?.current_down_level_index < 3
                        ? autopoolInfo?.current_down_level_index + 1
                        : 1,
                    current_up_level_limit:
                      autopoolInfo?.current_up_level_limit,
                    this_index: autopoolInfo?.this_index + 1,
                    tree_history: [
                      ...autopoolInfo?.tree_history,
                      {
                        user_id,
                        up_level: autopoolInfo?.current_up_level,
                        down_level: autopoolInfo?.current_down_level,
                        parent: current_parent[0]?.user_id,
                        this_child_index:
                          autopoolInfo?.current_down_level_index < 3
                            ? autopoolInfo?.current_down_level_index + 1
                            : 1,
                        this_index: autopoolInfo?.this_index + 1,
                      },
                    ],
                  },
                }
              );
              // create autopool one document
              await Model.create({
                user_id,
                top1: current_parent[0]?.user_id,
                top2: top2_parent,
                child: [],
              });

              // income level update
              // update current autopool for that user
              await User.findOneAndUpdate(
                { user_id },
                {
                  $set: {
                    current_autopool: autopoolNumber,
                  },
                }
              );
              // sponsor
              await Wallet.findOneAndUpdate(
                { user_id: user?.sponsor_id },
                {
                  $inc: {
                    level_update_income: +sponsorIncome[value[autopoolNumber]],
                    total_income: +sponsorIncome[value[autopoolNumber]],
                  },
                }
              );
              await IncomeLevelUpdate.create({
                user_id: user?.sponsor_id,
                transaction_id: generateString(),
                amount: sponsorIncome[value[autopoolNumber]],
                autopool: autopoolNumber,
                income_from: user_id,
              });
              // admin
              await AdminWallet.findOneAndUpdate(
                { user_id: "ADMIN" },
                {
                  $inc: {
                    level_update_income: +AdminIncome[value[autopoolNumber]],
                    total_amount: +AdminIncome[value[autopoolNumber]],
                  },
                }
              );
              await IncomeLevelUpdate.create({
                user_id: "ADMIN",
                transaction_id: generateString(),
                amount: AdminIncome[value[autopoolNumber]],
                autopool: autopoolNumber,
                income_from: user_id,
              });

              // Inser on Royalty
              if (autopoolNumber === 11) {
                RoyaltiIncome.create({
                  user_id,
                  status: true,
                });
              }

              // push this user to the top1 child array
              await Model.findOneAndUpdate(
                { user_id: current_parent[0]?.user_id },
                {
                  $push: {
                    child: user_id,
                  },
                }
              );
              // push this user to the top2 child array
              await Model.findOneAndUpdate(
                { user_id: top2_parent },
                {
                  $push: {
                    child: user_id,
                  },
                }
              );
              // distribute autopool income to top1 and top2 parent
              // ------------ //
              // top1
              const top1Account = await User.findOne({
                user_id: current_parent[0]?.user_id,
              });
              const top1Wallet = await Wallet.findOne({
                user_id: current_parent[0]?.user_id,
              });
              let matchedTop1;
              const queueTop1 = await AutopoolQueue.findOne({
                autopool_name: value[autopoolNumber + 1],
              });
              if (!queueTop1?.autopool_name) {
                matchedTop1 = [];
              } else {
                matchedTop1 = queueTop1?.stack?.filter(
                  (m) => m === current_parent[0]?.user_id
                );
              }
              if (
                matchedTop1?.length === 0 &&
                autopoolNumber < 16 &&
                top1Account?.current_autopool <= autopoolNumber &&
                top1Wallet?.autopool_freez_income <
                  upgradeAmount[value[autopoolNumber]]
              ) {
                let amount;
                let extraAmount;
                if (
                  parseInt(top1Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) >
                  parseInt(upgradeAmount[value[autopoolNumber]])
                ) {
                  extraAmount =
                    parseInt(top1Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) -
                    parseInt(upgradeAmount[value[autopoolNumber]]);
                  amount =
                    parseInt(upgradeAmount[value[autopoolNumber]]) -
                    parseInt(top1Wallet?.autopool_freez_income);
                } else {
                  extraAmount = 0;
                  amount = parseInt(incomeAmount[value[autopoolNumber]]);
                }
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent[0]?.user_id },
                  {
                    $inc: {
                      autopool_freez_income: +parseInt(amount),
                    },
                  }
                );
                /////
                // top1 direct list
                const top1Directs = await User.find({
                  $and: [
                    { sponsor_id: top1Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top1Directs?.lenght >= 20 ||
                  top1Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_income: +parseInt(extraAmount),
                        total_income: +parseInt(extraAmount),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(extraAmount),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: current_parent[0]?.user_id },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: current_parent[0]?.user_id,
                      amount: parseInt(extraAmount),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: current_parent[0]?.user_id },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(extraAmount),
                        },
                      }
                    );
                  }
                }
                /////
              } else {
                // top1 direct list
                const top1Directs = await User.find({
                  $and: [
                    { sponsor_id: top1Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top1Directs?.lenght >= 20 ||
                  top1Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                        total_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: current_parent[0]?.user_id },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: current_parent[0]?.user_id,
                      amount: parseInt(incomeAmount[value[autopoolNumber]]),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: current_parent[0]?.user_id },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(
                            incomeAmount[value[autopoolNumber]]
                          ),
                        },
                      }
                    );
                  }
                }
              }

              // top2
              const top2Account = await User.findOne({ user_id: top2_parent });
              const top2Wallet = await Wallet.findOne({ user_id: top2_parent });
              let matchedTop2;
              const queueTop2 = await AutopoolQueue.findOne({
                autopool_name: value[autopoolNumber + 1],
              });
              if (!queueTop2?.autopool_name) {
                matchedTop2 = [];
              } else {
                matchedTop2 = queueTop2?.stack?.filter(
                  (m) => m === top2_parent
                );
              }
              if (
                matchedTop2?.length === 0 &&
                autopoolNumber < 16 &&
                top2Account?.current_autopool <= autopoolNumber &&
                top2Wallet?.autopool_freez_income <
                  upgradeAmount[value[autopoolNumber]]
              ) {
                let amount;
                let extraAmount;
                if (
                  parseInt(top2Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) >
                  parseInt(upgradeAmount[value[autopoolNumber]])
                ) {
                  extraAmount =
                    parseInt(top2Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) -
                    parseInt(upgradeAmount[value[autopoolNumber]]);
                  amount =
                    parseInt(upgradeAmount[value[autopoolNumber]]) -
                    parseInt(top2Wallet?.autopool_freez_income);
                } else {
                  extraAmount = 0;
                  amount = parseInt(incomeAmount[value[autopoolNumber]]);
                }
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $inc: {
                      autopool_freez_income: +parseInt(amount),
                    },
                  }
                );

                /////
                // top2 direct list
                const top2Directs = await User.find({
                  $and: [
                    { sponsor_id: top2Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top2Directs?.lenght >= 20 ||
                  top2Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_income: +parseInt(extraAmount),
                        total_income: +parseInt(extraAmount),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(extraAmount),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: top2_parent },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: top2_parent,
                      amount: parseInt(extraAmount),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: top2_parent },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(extraAmount),
                        },
                      }
                    );
                  }
                }
                /////
              } else {
                // top2 direct list
                const top2Directs = await User.find({
                  $and: [
                    { sponsor_id: top2Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top2Directs?.lenght >= 20 ||
                  top2Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                        total_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: top2_parent },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: top2_parent,
                      amount: parseInt(incomeAmount[value[autopoolNumber]]),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: top2_parent },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(
                            incomeAmount[value[autopoolNumber]]
                          ),
                        },
                      }
                    );
                  }
                }
              }
              // check sponsor's autopool automatic upgrade
              // top1
              const updateedWalletTop1 = await Wallet.findOne({
                user_id: current_parent[0]?.user_id,
              });
              if (
                autopoolNumber < 16 &&
                updateedWalletTop1?.autopool_freez_income >=
                  upgradeAmount[value[autopoolNumber]] &&
                top1Account?.current_autopool <= autopoolNumber
              ) {
                updateAutopool(
                  autopoolNumber + 1,
                  top1Account?.user_id,
                  autopoolModel[autopoolNumber + 1]
                );
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent[0]?.user_id },
                  {
                    $set: {
                      autopool_freez_income: 0,
                    },
                  }
                );
              }
              // top2
              const updateedWalletTop2 = await Wallet.findOne({
                user_id: top2_parent,
              });
              if (
                autopoolNumber < 16 &&
                updateedWalletTop2?.autopool_freez_income >=
                  upgradeAmount[value[autopoolNumber]] &&
                top2Account?.current_autopool <= autopoolNumber
              ) {
                updateAutopool(
                  autopoolNumber + 1,
                  top2Account?.user_id,
                  autopoolModel[autopoolNumber + 1]
                );
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $set: {
                      autopool_freez_income: 0,
                    },
                  }
                );
              }
              // res.status(200).json({message: "successfull"})
            } else {
              // else up level corss it's index limit
              const previous_parent = autopoolInfo?.tree_history?.filter(
                (p) =>
                  autopoolInfo?.current_up_level === p?.down_level &&
                  p.this_child_index === 1
              );
              const current_parent = autopoolInfo?.tree_history?.filter(
                (c) =>
                  c?.parent === previous_parent[0]?.user_id &&
                  c?.this_child_index === 1
              );
              const top2_parent = current_parent[0]?.parent;
              console.log("192 previous parent ", previous_parent[0]?.user_id);
              console.log("192 current parent ", current_parent[0]?.user_id);
              console.log("192 top2 parent ", current_parent[0]?.parent);
              await AutopoolInfo.findOneAndUpdate(
                { autopool_name: value[autopoolNumber] },
                {
                  $set: {
                    current_up_level: current_parent[0]?.down_level,
                    current_up_level_index: current_parent[0]?.this_index,
                    current_down_level: current_parent[0]?.down_level + 1,
                    current_down_level_index: 1,
                    current_up_level_limit: Math.pow(
                      3,
                      current_parent[0]?.down_level - 1
                    ),
                    this_index: 1,
                    tree_history: [
                      ...autopoolInfo?.tree_history,
                      {
                        user_id,
                        up_level: current_parent[0]?.down_level,
                        down_level: current_parent[0]?.down_level + 1,
                        parent: current_parent[0]?.user_id,
                        this_child_index: 1,
                        this_index: 1,
                      },
                    ],
                  },
                }
              );
              // create autopool one document
              await Model.create({
                user_id,
                top1: current_parent[0]?.user_id,
                top2: top2_parent,
                child: [],
              });
              // update current autopool for that user
              await User.findOneAndUpdate(
                { user_id },
                {
                  $set: {
                    current_autopool: autopoolNumber,
                  },
                }
              );

              // income level update
              // sponsor
              await Wallet.findOneAndUpdate(
                { user_id: user?.sponsor_id },
                {
                  $inc: {
                    level_update_income: +sponsorIncome[value[autopoolNumber]],
                    total_income: +sponsorIncome[value[autopoolNumber]],
                  },
                }
              );
              await IncomeLevelUpdate.create({
                user_id: user?.sponsor_id,
                transaction_id: generateString(),
                amount: sponsorIncome[value[autopoolNumber]],
                autopool: autopoolNumber,
                income_from: user_id,
              });
              // admin
              await AdminWallet.findOneAndUpdate(
                { user_id: "ADMIN" },
                {
                  $inc: {
                    level_update_income: +AdminIncome[value[autopoolNumber]],
                    total_amount: +AdminIncome[value[autopoolNumber]],
                  },
                }
              );
              await IncomeLevelUpdate.create({
                user_id: "ADMIN",
                transaction_id: generateString(),
                amount: AdminIncome[value[autopoolNumber]],
                autopool: autopoolNumber,
                income_from: user_id,
              });

              // Inser on Royalty
              if (autopoolNumber === 11) {
                RoyaltiIncome.create({
                  user_id,
                  status: true,
                });
              }

              // push this user to the top1 child array
              await Model.findOneAndUpdate(
                { user_id: current_parent[0]?.user_id },
                {
                  $push: {
                    child: user_id,
                  },
                }
              );
              // push this user to the top2 child array
              await Model.findOneAndUpdate(
                { user_id: top2_parent },
                {
                  $push: {
                    child: user_id,
                  },
                }
              );
              // distribute autopool income to top1 and top2 parent
              // ------------ //
              // top1
              const top1Account = await User.findOne({
                user_id: current_parent[0]?.user_id,
              });
              const top1Wallet = await Wallet.findOne({
                user_id: current_parent[0]?.user_id,
              });
              let matchedTop1;
              const queueTop1 = await AutopoolQueue.findOne({
                autopool_name: value[autopoolNumber + 1],
              });
              if (!queueTop1?.autopool_name) {
                matchedTop1 = [];
              } else {
                matchedTop1 = queueTop1?.stack?.filter(
                  (m) => m === current_parent[0]?.user_id
                );
              }
              if (
                matchedTop1?.length === 0 &&
                autopoolNumber < 16 &&
                top1Account?.current_autopool <= autopoolNumber &&
                top1Wallet?.autopool_freez_income <
                  upgradeAmount[value[autopoolNumber]]
              ) {
                let amount;
                let extraAmount;
                if (
                  parseInt(top1Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) >
                  parseInt(upgradeAmount[value[autopoolNumber]])
                ) {
                  extraAmount =
                    parseInt(top1Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) -
                    parseInt(upgradeAmount[value[autopoolNumber]]);
                  amount =
                    parseInt(upgradeAmount[value[autopoolNumber]]) -
                    parseInt(top1Wallet?.autopool_freez_income);
                } else {
                  extraAmount = 0;
                  amount = parseInt(incomeAmount[value[autopoolNumber]]);
                }
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent[0]?.user_id },
                  {
                    $inc: {
                      autopool_freez_income: +parseInt(amount),
                    },
                  }
                );

                ////
                // top1 direct list
                const top1Directs = await User.find({
                  $and: [
                    { sponsor_id: top1Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top1Directs?.lenght >= 20 ||
                  top1Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_income: +parseInt(extraAmount),
                        total_income: +parseInt(extraAmount),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(extraAmount),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: current_parent[0]?.user_id },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: current_parent[0]?.user_id,
                      amount: parseInt(extraAmount),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: current_parent[0]?.user_id },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(extraAmount),
                        },
                      }
                    );
                  }
                }
                ////
              } else {
                // top1 direct list
                const top1Directs = await User.find({
                  $and: [
                    { sponsor_id: top1Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top1Directs?.lenght >= 20 ||
                  top1Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                        total_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: current_parent[0]?.user_id },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: current_parent[0]?.user_id },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: current_parent[0]?.user_id,
                      amount: parseInt(incomeAmount[value[autopoolNumber]]),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: current_parent[0]?.user_id },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(
                            incomeAmount[value[autopoolNumber]]
                          ),
                        },
                      }
                    );
                  }
                }
              }

              // top2
              const top2Account = await User.findOne({ user_id: top2_parent });
              const top2Wallet = await Wallet.findOne({ user_id: top2_parent });
              let matchedTop2;
              const queueTop2 = await AutopoolQueue.findOne({
                autopool_name: value[autopoolNumber + 1],
              });
              if (!queueTop2?.autopool_name) {
                matchedTop2 = [];
              } else {
                matchedTop2 = queueTop2?.stack?.filter(
                  (m) => m === top2_parent
                );
              }
              if (
                matchedTop2?.length === 0 &&
                autopoolNumber < 16 &&
                top2Account?.current_autopool <= autopoolNumber &&
                top2Wallet?.autopool_freez_income <
                  upgradeAmount[value[autopoolNumber]]
              ) {
                let amount;
                let extraAmount;
                if (
                  parseInt(top2Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) >
                  parseInt(upgradeAmount[value[autopoolNumber]])
                ) {
                  extraAmount =
                    parseInt(top2Wallet?.autopool_freez_income) +
                    parseInt(incomeAmount[value[autopoolNumber]]) -
                    parseInt(upgradeAmount[value[autopoolNumber]]);
                  amount =
                    parseInt(upgradeAmount[value[autopoolNumber]]) -
                    parseInt(top2Wallet?.autopool_freez_income);
                } else {
                  extraAmount = 0;
                  amount = parseInt(incomeAmount[value[autopoolNumber]]);
                }
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $inc: {
                      autopool_freez_income: +parseInt(amount),
                    },
                  }
                );

                ////
                // top2 direct list
                const top2Directs = await User.find({
                  $and: [
                    { sponsor_id: top2Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top2Directs?.lenght >= 20 ||
                  top2Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_income: +parseInt(extraAmount),
                        total_income: +parseInt(extraAmount),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(extraAmount),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: top2_parent },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: top2_parent,
                      amount: parseInt(extraAmount),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: top2_parent },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(extraAmount),
                        },
                      }
                    );
                  }
                }
                ////
              } else {
                // top2 direct list
                const top2Directs = await User.find({
                  $and: [
                    { sponsor_id: top2Account?.user_id },
                    { topup_status: true },
                  ],
                });
                if (
                  top2Directs?.lenght >= 20 ||
                  top2Directs?.length >= (autopoolNumber - 1) * 2
                ) {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                        total_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );
                } else {
                  await Wallet.findOneAndUpdate(
                    { user_id: top2_parent },
                    {
                      $inc: {
                        autopool_lock_income: +parseInt(
                          incomeAmount[value[autopoolNumber]]
                        ),
                      },
                    }
                  );

                  // find aut0pool lock income document
                  const existingLockIncome = await AutopoolLockIncome.findOne({
                    $and: [
                      { user_id: top2_parent },
                      { autopool_name: value[autopoolNumber] },
                    ],
                  });
                  if (!existingLockIncome) {
                    await AutopoolLockIncome.create({
                      autopool_name: value[autopoolNumber],
                      user_id: top2_parent,
                      amount: parseInt(incomeAmount[value[autopoolNumber]]),
                    });
                  } else {
                    await AutopoolLockIncome.findOneAndUpdate(
                      {
                        $and: [
                          { user_id: top2_parent },
                          { autopool_name: value[autopoolNumber] },
                        ],
                      },
                      {
                        $inc: {
                          amount: +parseInt(
                            incomeAmount[value[autopoolNumber]]
                          ),
                        },
                      }
                    );
                  }
                }
              }
              // check sponsor's autopool automatic upgrade
              // top1
              const updateedWalletTop1 = await Wallet.findOne({
                user_id: current_parent[0]?.user_id,
              });
              if (
                autopoolNumber < 16 &&
                updateedWalletTop1?.autopool_freez_income >=
                  upgradeAmount[value[autopoolNumber]] &&
                top1Account?.current_autopool <= autopoolNumber
              ) {
                updateAutopool(
                  autopoolNumber + 1,
                  top1Account?.user_id,
                  autopoolModel[autopoolNumber + 1]
                );
                await Wallet.findOneAndUpdate(
                  { user_id: current_parent[0]?.user_id },
                  {
                    $set: {
                      autopool_freez_income: 0,
                    },
                  }
                );
              }
              // top2
              const updateedWalletTop2 = await Wallet.findOne({
                user_id: top2_parent,
              });
              if (
                autopoolNumber < 16 &&
                updateedWalletTop2?.autopool_freez_income >=
                  upgradeAmount[value[autopoolNumber]] &&
                top2Account?.current_autopool <= autopoolNumber
              ) {
                updateAutopool(
                  autopoolNumber + 1,
                  top2Account?.user_id,
                  autopoolModel[autopoolNumber + 1]
                );
                await Wallet.findOneAndUpdate(
                  { user_id: top2_parent },
                  {
                    $set: {
                      autopool_freez_income: 0,
                    },
                  }
                );
              }
              // res.status(200).json({message: "successfull"})
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    // message: error.toString()
    //   })
  }
};

module.exports = updateAutopool;
