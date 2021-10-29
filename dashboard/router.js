const express = require("express");
const router = express.Router();
const { index } = require("./controller");
// const { indexAuth } = require('../middleware/auth');


// router.use(indexAuth)
router.get("/", index);

module.exports = router;
