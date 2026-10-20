
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        // Get the custom filename from the request body
        const customName = req.body.filename;

        // Keep the original file extension
        const ext = path.extname(file.originalname);

        // Use custom name if provided; otherwise generate a unique name
        const finalName = customName
            ? path.basename(customName, path.extname(customName)) + ext
            : Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

        cb(null, finalName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, callback) => {
        const mimetype = file.mimetype;

        if (mimetype === "image/jpg" || mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "application/pdf") {
            callback(null, true);
        } else {
            callback(new Error("Unsupported file format"));
        }

    }
});

module.exports = upload;
