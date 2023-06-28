const express = require('express');
const router = express.Router();

const upload = require('../utils/imageUpload');
const createThumbnail = require('../utils/createThumbnail');

const imageController = require('../controllers/imageController')

router.get('/', imageController.getAllImages);

router.get('/:imageId', imageController.getImage);

router.post('/',
  upload.single('image'),
  createThumbnail,
  async (req, res) => await imageController.createImage(req, res)
);

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