const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../config");
module.exports = {
  index: async (req, res) => {
    try {
      const vouchers = await Voucher.find()
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/view_voucher", { vouchers });
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find().then();
      const nominal = await Nominal.find().then();
      res.render("admin/voucher/create", { category, nominal });
    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      if (req.file) {
        let temp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(temp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const { nameGame, category, nominals } = req.body;
            const voucher = new Voucher({
              nameGame,
              thumbnail: filename,
              category,
              nominals,
            });
            await voucher.save();
            res.redirect("/voucher");
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        let voucher = await new Voucher(req.body);
        await voucher.save();
        res.redirect("/voucher");
      }
    } catch (err) {
      console.log(err);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id }).then();
      const category = await Category.find().then();
      const nominal = await Nominal.find().then();
      res.render("admin/voucher/edit", { nominal, category, voucher });
    } catch (err) {
      console.log(err);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameGame, category, nominals } = req.body;
      if (req.file) {
        let temp_path = req.file.path;
        let originalExt = req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );
        const src = fs.createReadStream(temp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = await Voucher.find();
            let currentImg = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImg)) {
              fs.unlinkSync(currentImg);
            }
            await Voucher.updateOne(
              { _id: id },
              { nameGame, thumbnail: filename, category, nominals }
            );
            res.redirect("/voucher");
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        await Voucher.updateOne({ _id: id }, { $set: req.body }).then(() => {
          res.redirect("/voucher");
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Voucher.deleteOne({ _id: id }).then(() => {
        res.redirect("/voucher");
      });
    } catch (err) {
      console.log(err);
    }
  },
};
