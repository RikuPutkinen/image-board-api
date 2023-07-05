const path = require('path');
const sharp = require('sharp');

module.exports = async function(req, res, next) {
  const fileName = req.file.filename;
  const filePath = req.file.path;
  
  await sharp(filePath)
    // Make sure the image keeps the original orientation
    .rotate()
    .resize(300, 300, {
      fit: 'inside',
    })
    .toFile(
      path.join(req.file.destination, `thumbnail_${fileName}`));
  next();
}
