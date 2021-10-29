const Transaction = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.render("admin/transaction/view_transaction", { transactions });
    } catch (err) {
      console.log(err);
    }
  },
};
