const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");
const { signin, signup } = require("./controller");

router.post("/signup", multer({ dest: os.tmpdir() }).single("avatar"), signup);
router.post("/signin", signin);

// router.get("/detailpage/:id", detailPage);

module.exports = router;
