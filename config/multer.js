const multer = require("multer");
const PATH = "./public/uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    let originalname = file.originalname;
    let ext = originalname.substr(originalname.lastIndexOf(".") + 1);
    let fileName = Date.now() + "." + ext;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
