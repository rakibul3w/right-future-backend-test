const AutopoolLockIncome = require("../models/autopool-trial/autopoolLockIncome");
const Wallet = require("../models/walletModel");

const updateAutopoolLockIncome = async (totalDirect, user_id) => {
  try {
    if (totalDirect >= 2) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-two" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-two" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 4) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-three" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-three" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 6) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-four" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-four" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 8) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-five" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-five" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 10) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-six" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-six" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 12) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-seven" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-seven" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 14) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-eight" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-eight" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 16) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-nine" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-nine" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 18) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-ten" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-ten" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }

    if (totalDirect >= 20) {
      const currentLockIncome = await AutopoolLockIncome.findOne({
        $and: [{ autopool_name: "autopool-eleven" }, { user_id }],
      });
      await Wallet.findOneAndUpdate(
        { user_id },
        {
          $inc: {
            autopool_lock_income: -parseInt(currentLockIncome?.amount),
            autopool_income: +parseInt(currentLockIncome?.amount),
            total_income: +parseInt(currentLockIncome?.amount),
          },
        }
      );
      await AutopoolLockIncome.findOneAndUpdate(
        { $and: [{ autopool_name: "autopool-eleven" }, { user_id }] },
        {
          $set: {
            amount: 0,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAutopoolLockIncome;
