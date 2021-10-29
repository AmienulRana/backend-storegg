const Category = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.find().then();
      res.render("admin/category/view_category", { category });
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { nama } = req.body;
      let category = await new Category({ nama });
      await category.save();
      res.redirect("/category");
    } catch (err) {
      console.log(err);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id }).then();
      res.render("admin/category/edit", { category });
    } catch (err) {
      console.log(err);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.updateOne({ _id: id }, { $set: req.body }).then(() => {
        res.redirect("/category");
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.deleteOne({ _id: id }).then(() => {
        res.redirect("/category");
      });
    } catch (err) {
      console.log(err);
    }
  },
};
