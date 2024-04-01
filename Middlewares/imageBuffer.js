//import multer
const multer = require("multer");

//define type of storage
const buffer = multer.memoryStorage();

//filter files
const fileFiltering = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Upload Image Only"), false);
  }
};

const upload = multer({
  buffer: buffer,
  fileFilter: fileFiltering,
});

module.exports = upload.single("photo");
