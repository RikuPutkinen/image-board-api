const Image = require('../models/image');

async function addImageToDatabase(filepath, uuid) {
  const image = await Image.query().insert({
    filepath: filepath,
    image_id: uuid
  })

  console.log(`Uploaded image ${uuid} to database`);
  return image;
}

async function deleteImageFromDatabase(image_id) {
  await Image.query().deleteById(image_id);
}

async function getImage(image_id) {
  const image = await Image.query()
    .findById(image_id)
    .withGraphFetched('tags');
  console.log(`GET /images/${image_id}`);
  return image;
}

async function getAllImages() {
  const images = await Image.query()
    .withGraphFetched('tags');
  console.log('GET /images');
  return images;
}

module.exports = {
  addImageToDatabase,
  deleteImageFromDatabase,
  getImage,
  getAllImages
}