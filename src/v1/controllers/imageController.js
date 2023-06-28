const imageService = require('../services/imageService');

async function getAllImages(req, res) {
  const images = await imageService.getAllImages();
  res.status(200).json(images);
}

async function getImage(req, res) {
  const { imageId } = req.params;
  const image = await imageService.getImage(imageId);
  res.status(200).json(image);
}

async function createImage(req, res) {
  const uuid = req.body.uuid;
  const filePath = req.file.path;
  const tags = req.body.tags;

  await imageService.createImage(filePath, uuid, tags);
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