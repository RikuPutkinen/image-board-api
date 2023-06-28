const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const path = `${__dirname}/../../../public/data/uploads/${year}/${month}/${day}`;
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

    cb(null, path);
  },
  filename: function(req, file, cb) {
    const extension = path.extname(file.originalname);
    const uuid = crypto.randomUUID();
    req.body.uuid = uuid;
    const name = uuid + extension;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;