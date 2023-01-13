const boosterFunction = require("../../config/boosterFunction");
const User = require("../../models/userModel");
const Wallet = require("../../models/walletModel");

const enterToBooster = async (req, res) => {
  try {
    const user_id = req.auth.id;
    // Useful variable initialization
    // user info
    const user = await User.findOne({ user_id });
    const userWallet = await Wallet.findOne({ user_id });
    // this user booser
    const thisUserBooster = await Booster.find({ user_id });
    // conditions --->>
    if (!user.topup_status) {
      res.status(400).json({ message: "Please activate your account" });
    } else {
      if (thisUserBooster?.length === 0) {
        // $55
        if (
          parseInt(userWallet?.total_deposite) + parseInt(total_income) >=
          55
        ) {
          if (parseInt(userWallet?.total_deposite) >= 55) {
            await Wallet.findOneAndUpdate(
              { user_id },
              {
                $inc: {
                  total_deposite: -55,
                },
              }
            );
            await boosterFunction(user_id);
          } else {
            await Wallet.findOneAndUpdate(
              { user_id },
              {
                $set: {
                  total_deposite: 0,
                  total_income:
                    parseInt(userWallet?.total_income) -
                    (55 - parseInt(userWallet?.total_deposite)),
                },
              }
            );
            await boosterFunction(user_id);
          }
          res.status(200).json({ message: "Successfull" });
        } else {
          res.status(400).json({ message: "Insufficient balance" });
        }
      } else {
        // $10
        if (
          parseInt(userWallet?.total_deposite) + parseInt(total_income) >=
          10
        ) {
          if (parseInt(userWallet?.total_deposite) >= 10) {
            await Wallet.findOneAndUpdate(
              { user_id },
              {
                $inc: {
                  total_deposite: -10,
                },
              }
            );
            await boosterFunction(user_id);
          } else {
            await Wallet.findOneAndUpdate(
              { user_id },
              {
                $set: {
                  total_deposite: 0,
                  total_income:
                    parseInt(userWallet?.total_income) -
                    (10 - parseInt(userWallet?.total_deposite)),
                },
              }
            );
            await boosterFunction(user_id);
          }
          res.status(200).json({ message: "Successfull" });
        } else {
          res.status(400).json({ message: "Insufficient balance" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  enterToBooster,
};
