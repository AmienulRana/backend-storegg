const Nominal = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const nominal = await Nominal.find().then();
      res.render("admin/nominal/view_nominal", { nominal });
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: (req, res) => {
    try {
      res.render("admin/nominal/create");
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      let nominal = await new Nominal(req.body);
      await nominal.save();
      res.redirect("/nominal");
    } catch (err) {
      console.log(err);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id }).then();
      res.render("admin/nominal/edit", { nominal });
    } catch (err) {
      console.log(err);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.updateOne({ _id: id }, { $set: req.body }).then(() => {
        res.redirect("/nominal");
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.deleteOne({ _id: id }).then(() => {
        res.redirect("/nominal");
      });
    } catch (err) {
      console.log(err);
    }
  },
};
