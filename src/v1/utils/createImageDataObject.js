const routeToURL = require('./routeToURL');

function createImageDataObject(req, image) {
  const imageData = { ...image };
  if (imageData.filepath) delete imageData.filepath;
  imageData.imageRoute = routeToURL(req, image.imageRoute());
  imageData.thumbnailRoute = routeToURL(req, image.thumbnailRoute());
  return imageData;
}

module.exports = createImageDataObject;