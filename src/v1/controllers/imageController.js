const imageService = require('../services/imageService');
const path = require('path');

function filepathToURL(req, filepath, thumbnail=false) {
  const protocol = req.protocol;
  const host = req.get('host');
  
  let route = filepath.match(/uploads.*/)[0];
  if (thumbnail) {
    const dir = path.dirname(route);
    const filename = path.basename(route);
    route = path.join(dir, `thumbnail_${filename}`);
  }

  const URL = `${protocol}://${host}/${route}`;
  return URL;
}

async function getAllImages(req, res) {
  const images = await imageService.getAllImages();
  
  const imageArr = images.map(image => {
    const { image_id, created_at, filepath } = image;
    const protocol = req.protocol;
    const host = req.get('host');
    const thumbnailURL = filepathToURL(req, filepath, thumbnail=true);
    const pageURL = `${protocol}://${host}/images/${image_id}`;

    return {
      image_id,
      created_at,
      thumbnailURL,
      pageURL
    };
  });

  res.status(200).json(imageArr);
}

async function getImage(req, res) {
  const { imageId } = req.params;
  const image = await imageService.getImage(imageId);
  const { image_id, created_at, filepath } = image;
  const imageURL = filepathToURL(req, filepath);

  const imageData = {
    image_id,
    created_at,
    imageURL
  };

  res.status(200).json(imageData);
}

async function createImage(req, res) {
  const uuid = req.body.uuid;
  const filePath = req.file.path;
  const tags = req.body.tags;

  await imageService.createImage(filePath, uuid, tags);
  res.status(201).location(uuid).end();
}

async function deleteImage(req, res) {

}

module.exports = {
  getAllImages,
  getImage,
  createImage,
  deleteImage
}