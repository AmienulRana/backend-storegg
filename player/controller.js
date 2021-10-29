const Player = require("./model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Payment = require("../payment/model");
const Bank = require("../bank/model");
const Nominal = require("../nominal/model");
const Transaction = require("../transaction/model");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .populate("category")
        .select("_id name category thumbnail status");
      res.status(200).json({
        data: voucher,
      });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals")
        .populate("user", "_id username phoneNumber");
      console.log(voucher);
      if (!voucher) {
        return res.status(404).json({ message: "Voucher game not found!!" });
      }
      res.status(200).json({
        data: voucher,
      });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({
        data: category,
      });
    } catch (e) {}
  },
  checkout: async (req, res) => {
    try {
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;
      const res_voucher = await Voucher.findOne({ _id: voucher })
        .select("name category _id thumbnail user")
        .populate("category")
        .populate("user");
      if (!res_voucher)
        return res.status(404).json({ message: "Voucher not found" });
      const res_nominal = await Nominal.findOne({ _id: nominal });
      if (!res_nominal)
        return res.status(404).json({ message: "Voucher not found" });

      const res_payment = await Payment.findOne({ _id: payment });
      if (!res_payment)
        return res.status(404).json({ message: "Payment not found" });
      const res_bank = await Bank.findOne({ _id: bank });
      if (!res_bank) return res.status(404).json({ message: "Bank not found" });

      let tax = (10 / 100) * res_nominal._doc.price;
      let value = res_nominal._doc.price - tax;
      const payload = {
        historyTopupVoucher: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category ? res_voucher._doc.category : "",
          thumbanail: res_voucher._doc.thumbanail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        historyPayment: {
          namaPemilik: res_payment._doc.name,
          namaBank: res_payment._doc.bankName,
          noRekening: res_payment._doc.noRekening,
          tipePembayaran: res_payment._doc.type,
        },
        name: name,
        accountUser: accountUser,
        tax: tax,
        value: value,
        player: req.player._id,
        historyUser: {
          name: res_voucher._doc.user?._id,
          phoneNumber: res_voucher._doc.user?.phoneNumber,
        },
        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };
      const transaction = new Transaction(payload);
      await transaction.save();
      return res.status(201).json({ data: transaction });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  history: async (req, res) => {
    try {
      const { status = "" } = req.query;
      let criteria = {};
      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $option: "i" },
        };
      }
      if (req.player._id) {
        criteria = {
          ...criteria,
          player: req.player._id,
        };
      }
      const history = await Transaction.find(criteria);

      res.status(200).json({ data: history });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  historyDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const history = await Transaction.findOne({ _id: id });

      if (!history) {
        return res.status(404).json({ message: "history tidak ditemukan" });
      }
      res.status(200).json({ data: history });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  dashboard: async (req, res) => {
    try {
      const count = await Transaction.aggregate([
        {
          $match: { player: req.player._id },
          $group: {
            _id: "$category",
            value: { $sum: "$value" },
          },
        },
      ]);
      const category = await Category.find({});
      category.forEach((element) => {
        count.forEach((data) => {
          if (data._id.toString() === element._id.soString()) {
            data.name = element.name;
          }
        });
      });
      const history = await Transaction.find({
        player: req.player._id,
      })
        .populate("category")
        .populate({ updateAt: -1 });
      res.status(200).json({ data: history, count: count });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  dashboard: async (req, res) => {
    try {
      const player = {
        _id: req.player._id,
        phoneNumber: req.player.phoneNumber,
        username: req.player.username,
        email: req.player.email,
        avatar: req.player.avatar,
      };
      res.status(200).json({ data: player });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
