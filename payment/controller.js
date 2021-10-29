const Payment = require("./model");
const Bank = require("../bank/model");
module.exports = {
  index: async (req, res) => {
    try {
      const payments = await Payment.find().populate("bank");
      res.render("admin/payment/view_payment", { payments });
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find().then();
      res.render("admin/payment/create", { banks });
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      let payment = await new Payment(req.body);
      await payment.save();
      res.redirect("/payment");
    } catch (err) {
      console.log(err);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id }).populate("bank");
      console.log(payment);
      const banks = await Bank.find().then();
      res.render("admin/payment/edit", { payment, banks });
    } catch (err) {
      console.log(err);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.updateOne({ _id: id }, { $set: req.body }).then(() => {
        res.redirect("/payment");
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.deleteOne({ _id: id }).then(() => {
        res.redirect("/payment");
      });
    } catch (err) {
      console.log(err);
    }
  },
};
