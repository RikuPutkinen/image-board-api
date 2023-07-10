const imageUtils = require('../../../db/utils/imageUtils');
const imageTagUtils = require('../../../db/utils/imageTagUtils');
const path = require('path');

function routeToURL(req, route) {
  const protocol = req.protocol;
  const host = req.get('host');
  const URL = `${protocol}://${host}${route}`;
  return URL;
}

function createImageDataObject(req, image) {
  const imageData = {
    imageId: image.imageId,
    createdAt: image.createdAt,
    tags: image.tags
  };
  imageData.imageRoute = routeToURL(req, image.imageRoute());
  imageData.thumbnailRoute = routeToURL(req, image.thumbnailRoute());
  return imageData;
}

async function getAllImages(req) {
  const images = await imageUtils.getAllImages();
  const imageArr = images.map(image => {
    return createImageDataObject(req, image);
  })

  return imageArr;
}

async function getImage(req, id) {
  const image = await imageUtils.getImage(id);
  const imageData = createImageDataObject(req, image);
  return imageData;
}

async function createImage(filepath, uuid, tags) {
  const image = await imageUtils.addImageToDatabase(filepath, uuid);
  image.tags = [];
  
  // Add tags
  if (tags) {
    const tagArr = tags.split(' ');
    tagArr.forEach(async tag => {
      const tagData = await imageTagUtils.addTagToImage(uuid, tag);
      image.tags.push(tagData);
    });
  }

  return image;
}

async function deleteImage(req, res) {

}

module.exports = {
  getAllImages,
  getImage,
  createImage,
  deleteImage
}