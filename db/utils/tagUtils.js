const Tag = require('../models/tag');
const crypto = require('crypto');
const imageUtils = require('./imageUtils');

async function createTag(tagName) {
  const tagNameLower = tagName.toLowerCase();
  const tagId = crypto.randomUUID();
  const tag = {
    tagId,
    tagName: tagNameLower
  };
  await Tag.query().insert(tag);

  console.log(`Created tag ${tagId} with name ${tagNameLower}`)
  return tag;
}

async function getTag(tag_id) {
  const tag = await Tag.query().findById(tag_id);
  const images = await tag.$relatedQuery('images');
  return { ...tag, images };
}

async function getTagByName(tag_name) {
  const tag = await Tag.query().findOne({ tag_name });
  return tag;
}

async function getAllTags() {
  const tags = await Tag.query();
  return tags;
}

async function deleteTag(tag_id) {

}

async function updateTag(tag_id, opts) {

}

module.exports = {
  createTag,
  getTagByName,
  getAllTags,
  getTag
}