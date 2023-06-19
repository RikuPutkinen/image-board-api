const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const express = require('express');
const router = express.Router();
const utils = require('../../utils');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const path = `${__dirname}/../../../public/data/uploads/${year}/${month}/${day}`;
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });

    cb(null, path);
  },
  filename: function(req, file, cb) {
    const extension = path.extname(file.originalname);
    const name = crypto.randomBytes(32).toString('hex') + extension;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });


// GET all images
router.get('/', (req, res) => {
  res.json({
    message: "GET all images"
  });
});

// GET one image
router.get('/:imageId', (req, res) => {
  res.json({
    message: "GET one image"
  });
});

// POST a new image
router.post('/', upload.single('image'), async (req, res) => {
  const fileName = req.file.filename;
  const filePath = req.file.path;
  
  // Make a thumbnail
  await sharp(filePath)
    .resize(300, 300, {
      fit: 'inside',
    })
    .toFile(
      path.join(req.file.destination, `thumbnail_${fileName}`))
  
  // Add image to database
  const imageUUID = (await utils.addImageToDatabase(filePath)).imageUUID;

  // Add tags
  if (req.body.tags) {
    const tags = req.body.tags.split(' ');
    tags.forEach(async tag => {
      await utils.addTagToImage(imageUUID, tag);
    });
  }

  res.sendStatus(201);
});

// PATCH an image
router.patch('/:imageId', (req, res) => {
  res.json({
    message: "PATCH an image"
  });
});

// DELETE an image
router.delete('/:imageId', (req, res) => {
  res.json({
    message: "DELETE image"
  });
});

module.exports = router;