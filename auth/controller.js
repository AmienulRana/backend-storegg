const Player = require("../player/model");
const path = require("path");
const fs = require("fs");
const config = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;
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
            const player = new Player({
              ...payload,
              avatar: filename,
            });
            await player.save();
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        const player = new Player(payload);
        await player.save();
        delete player._doc.password;
        res.status(201).json({
          data: player,
        });
      }
    } catch (err) {
      if (err && err.username === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next();
    }
  },
  signin: (req, res, next) => {
    const { email, password } = req.body;
    Player.findOne({ email: email })
      .then((result) => {
        if (result) {
          const checkPassword = bcrypt.compareSync(password, result.password);
          console.log(checkPassword);
          if (checkPassword) {
            const token = jwt.sign(
              {
                id: result._id,
                username: result.username,
                email: result.email,
                phoneNumber: result.phoneNumber,
                avatar: result.avatar,
              },
              config.jwtKey
            );
            res.status(200).json({
              player: token,
            });
          } else {
            res.status(403).json({ message: "password anda salah" });
          }
        } else {
          res
            .status(403)
            .json({ message: "email yang anda masukkan belum terdaftar" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server Error" });
      });
  },
};
