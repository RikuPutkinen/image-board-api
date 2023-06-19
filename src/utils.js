const Image = require('../db/models/image');
const Tag = require('../db/models/tag');
const ImageTag = require('../db/models/image_tag');
const crypto = require('crypto');

async function addImageToDatabase(filepath) {
  const uuid = crypto.randomUUID();
  const image = await Image.query().insert({
    filepath: filepath,
    image_id: uuid
  })

  console.log(`Uploaded image ${uuid} to database`)
  return {
    imageUUID: uuid
  }
}

async function deleteImageFromDatabase(image_id) {
  await Image.query().deleteById(image_id);
}

async function getImage(image_id) {
  const image = await Image.query().findById(image_id);
  const tags = getImageTags(image_id);

  return { image, tags };
}

async function getAllImages() {
  const images = await Image.query();
  return images;
}

async function createTag(tag_name) {
  const tag_id = crypto.randomUUID();
  await Tag.query().insert({
    tag_id,
    tag_name
  });

  console.log(`Created tag ${tag_id} with name ${tag_name}`)
  return { tag_id };
}

async function getImageTags(image_id) {
  const tagNames = await ImageTag.query()
    .joinRelated('tags')
    .where('image_id', image_id);

  return tagNames;
}

async function addTagToImage(image_id, tag_name) {
  let tag_id;
  let tag = await Tag.query().findOne({ tag_name });
  if (tag) tag_id = tag.tag_id;
  else tag_id = (await createTag(tag_name)).tag_id;
  
  await ImageTag.query().insert({
    image_id,
    tag_id
  })

  console.log(`Added tag ${tag_id} to image ${image_id}`)
}

module.exports = {
  addImageToDatabase,
  deleteImageFromDatabase,
  getImage,
  getAllImages,
  addTagToImage
}