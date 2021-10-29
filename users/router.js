const express = require("express");
const router = express.Router();
const {
  index,
  actionCreate,
} = require("./controller");

router.get("/", index);
router.post("/login", actionCreate);


module.exports = router;
