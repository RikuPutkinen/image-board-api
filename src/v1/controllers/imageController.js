const imageService = require('../services/imageService');

async function getAllImages(req, res) {
  res.json({
    message: "get all images"
  })
}

async function getImage(req, res) {
  res.json({
    message: "get one image"
  })
}

async function createImage(req, res) {
  const uuid = req.body.uuid;
  const filePath = req.file.path;
  const tags = req.body.tags;

  await imageService.createImage(filePath, uuid, tags);
  console.log('Controller res');
  res.status(201).location(uuid).end();
}

async function deleteImage(req, res) {

}

module.exports = {
  getAllImages,
  getImage,
  createImage,
  deleteImage
}