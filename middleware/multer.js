// Desc: Multer middleware for file upload

const multer = require("multer");
const path = require("path");

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      cb(new Error("Only .jpg, .jpeg, and .png files are allowed."), false);
      return;
    }
    cb(null, true);
  },
});
