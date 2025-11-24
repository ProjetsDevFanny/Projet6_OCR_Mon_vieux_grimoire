const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Middleware pour convertir l'image uploadée en WebP
const convertToWebp = (req, res, next) => {
  if (!req.file) return next(); // pas d'image, on continue

  console.log(req.file); // affiche l'objet complet

  const filePath = req.file.path;
  const dir = path.dirname(filePath);
  const nameWithoutExt = path.parse(filePath).name;
  const newFilePath = path.join(dir, nameWithoutExt + '.webp');

  sharp(filePath)
    .resize(600, 300, {     
      fit: 'inside',         
      withoutEnlargement: true 
    })
    .webp({ quality: 75 }) 
    .toFile(newFilePath)
    .then(() => {
      fs.unlinkSync(filePath); // supprime l'original
      req.file.filename = path.basename(newFilePath); // update filename pour le controller
      next();
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

module.exports = convertToWebp;