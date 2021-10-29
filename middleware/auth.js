const config = require("../config");
const jwt = require("jsonwebtoken");
const Player = require("../player/model");
module.exports = {
  indexAuth: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      res.redirect("/");
    } else {
      next();
    }
  },
  isLoginPlayer: async (req, res, next) => {
    try {
      const token = req.headers["authorization"]
        ? req.headers["authorization"].split(" ")[1]
        : null;
      const data = jwt.verify(token, config.jwtKey);
      const player = await Player.findOne({ _id: data.id });
      if (!player) {
        throw new Error();
      }
      req.player = player;
      req.token = token;
      next();
    } catch (e) {
      console.log(e);
      res.status(401).json({
        message: "Not Authorized to access the resource",
      });
    }
  },
};
