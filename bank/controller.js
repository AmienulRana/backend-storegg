const Bank = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const bank = await Bank.find().then();
      res.render("admin/bank/view_bank", { bank });
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      let bank = await new Bank(req.body);
      await bank.save();
      res.redirect("/bank");
    } catch (err) {
      console.log(err);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id }).then();
      res.render("admin/bank/edit", { bank });
    } catch (err) {
      console.log(err);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.updateOne({ _id: id }, { $set: req.body }).then(() => {
        res.redirect("/bank");
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.deleteOne({ _id: id }).then(() => {
        res.redirect("/bank");
      });
    } catch (err) {
      console.log(err);
    }
  },
};
