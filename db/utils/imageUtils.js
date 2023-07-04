const Image = require('../models/image');
const crypto = require('crypto');
const imageTagUtils = require('./imageTagUtils');

async function addImageToDatabase(filepath, uuid) {
  await Image.query().insert({
    filepath: filepath,
    image_id: uuid
  })

  console.log(`Uploaded image ${uuid} to database`);
  return uuid;
}

async function deleteImageFromDatabase(image_id) {
  await Image.query().deleteById(image_id);
}

async function getImage(image_id) {
  const image = await Image.query().findById(image_id);
  const tagNames = await getTagsForImage(image_id);
  console.log(tagNames);

  return { ...image, tagNames };
}

async function getTagsForImage(image_id) {
  const image = await Image.query().findById(image_id);
  const tags = await image.$relatedQuery('tags');
  
  const tagNames = tags.map(tag => tag.tag_name);
  return tagNames;
}

async function getAllImages() {
  const images = await Image.query();
  return images;
}

module.exports = {
  addImageToDatabase,
  deleteImageFromDatabase,
  getImage,
  getAllImages
}