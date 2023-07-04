const Tag = require('../models/tag');
const crypto = require('crypto');

async function createTag(tag_name) {
  const tag_name_lower = tag_name.toLowerCase();
  const tag_id = crypto.randomUUID();
  const tag = {
    tag_id,
    tag_name: tag_name_lower
  };
  await Tag.query().insert(tag);

  console.log(`Created tag ${tag_id} with name ${tag_name}`)
  return tag;
}

async function getTag(tag_id) {

}

async function getTagByName(tag_name) {
  let tag = await Tag.query().findOne({ tag_name });
  return tag;
}

async function getAllTags() {
  
}

async function deleteTag(tag_id) {

}

async function updateTag(tag_id, opts) {

}

module.exports = {
  createTag,
  getTagByName
}