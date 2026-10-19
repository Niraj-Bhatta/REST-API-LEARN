
const express = require("express");
const router = express.Router();

const { fileController } = require("../controllers");
const isAuth = require("../middleware/isAuth");
const multer = require("multer");

const upload = multer({
    dest: "./upload"
});

console.log("isAuth:", typeof isAuth);
console.log("fileController:", typeof fileController);
console.log("uploadFile:", typeof fileController?.uploadFile);

router.post(
    "/upload",
    isAuth,
    upload.single("file"),
    fileController.uploadFile
);

module.exports = router;
