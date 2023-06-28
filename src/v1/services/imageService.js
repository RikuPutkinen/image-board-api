const imageUtils = require('../../../db/utils/imageUtils');
const imageTagUtils = require('../../../db/utils/imageTagUtils');

async function getAllImages() {
  const images = await imageUtils.getAllImages();
  return images;
}

async function getImage(id) {
  const image = await imageUtils.getImage(id);
  return image;
}

async function createImage(filepath, uuid, tags) {
  await imageUtils.addImageToDatabase(filepath, uuid);

  // Add tags
  if (tags) {
    const tagArr = tags.split(' ');
    tagArr.forEach(async tag => {
      await imageTagUtils.addTagToImage(uuid, tag);
    });
  }

  return uuid;
}

async function deleteImage(req, res) {

}

module.exports = {
  getAllImages,
  getImage,
  createImage,
  deleteImage
}