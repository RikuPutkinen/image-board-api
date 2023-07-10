const tagService = require('../services/tagService');

async function getAllTags(req, res) {
  const tags = await tagService.getAllTags(req);
  res.status(200).json(tags);
}

async function getTag(req, res) {
  const { tagId } = req.params
  const tag = await tagService.getTag(req, tagId);
  res.status(200).json(tag);
}

module.exports = {
  getAllTags,
  getTag
}