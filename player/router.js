const express = require("express");
const router = express.Router();

const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  historyDetail,
  dashboard,
} = require("./controller");
const { isLoginPlayer } = require("../middleware/auth");

router.get("/landingpage", landingPage);
router.get("/detailpage/:id", detailPage);
router.get("/category", category);
router.post("/checkout", isLoginPlayer, checkout);
router.post("/history", isLoginPlayer, history);
router.post("/history/:id/detail", isLoginPlayer, historyDetail);
router.post("/dashboard", isLoginPlayer, dashboard);

module.exports = router;
