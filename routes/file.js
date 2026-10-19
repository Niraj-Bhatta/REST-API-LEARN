const express = require("express");
const router = express.Router();
const {fileController} = require("../controllers");
const isAuth = require("../middleware/isAuth")

router.post("/upload",isAuth, fileController.uploadFile)


module.exports = router;