const tagUtils = require('../../../db/utils/tagUtils');
const createImageDataObject = require('../utils/createImageDataObject');

function formatTagdata(req, tag) {
  const { images, ...tagData } = tag;
  if (images.length === 0) return tag;
  
  const imageDataArr = images.map(image => {
    return createImageDataObject(req, image);
  });

  return { 
    ...tagData, 
    images: imageDataArr };
}

async function getAllTags(req) {
  const tags = await tagUtils.getAllTags();
  const tagArr = tags.map(tag => {
    return formatTagdata(req, tag);
  });

  return tagArr;
}

async function getTag(req, tag_id) {
  const tag = await tagUtils.getTag(tag_id);
  const tagdata = formatTagdata(req, tag);
  return tagdata;
}

module.exports = { 
  getAllTags,
  getTag
}