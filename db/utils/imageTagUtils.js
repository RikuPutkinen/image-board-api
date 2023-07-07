const ImageTag = require('../models/imageTag');
const tagUtils = require('./tagUtils');

async function getTagId(tag_name) {
  let tag = await tagUtils.getTagByName(tag_name);
  if (!tag) tag = await tagUtils.createTag(tag_name);

  return tag;
}
/* 
async function getImageTagNames(image_id) {
  const tagNames = await ImageTag
    .$relatedQuery('tags')
    .where('image_id', image_id);

  return tagNames;
} */

async function addTagToImage(image_id, tag_name) {
  const tag = await getTagId(tag_name);
  
  await ImageTag.query().insert({
    image_id,
    tag_id: tag.tag_id
  })

  console.log(`Added tag ${tag.tag_id} to image ${image_id}`);
  return tag;
}

async function removeTagFromImage(image_id, tag_name) {
  const tag_id = await getTagId(tag_name);
  await ImageTag.query().deleteById([image_id, tag_id]);

  console.log(`Removed tag ${tag_id} from image ${image_id}`);
}

module.exports = {
  //getImageTagNames,
  addTagToImage,
  removeTagFromImage
}