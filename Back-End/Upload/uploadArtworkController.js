const express = require('express');
const router = express.Router();
const db = require('../connection');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

router.post('/artworks', async (req, res) => {
  const { user_id, title, description, tags, image_url, maxDimension } = req.body;

  const insertQuery = `
    INSERT INTO artworks (user_id, title, description, tags, image_url)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const imagePath = await processAndSaveImage(image_url, maxDimension);

    db.query(insertQuery, [user_id, title, description, tags, imagePath], (error, results) => {
      if (error) {
        console.error('Error creating artwork:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'Artwork uploaded successfully' });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function processAndSaveImage(image_url, maxDimension) {
  const response = await axios.get(image_url, { responseType: 'arraybuffer' });
  const imageName = generateImageName();
  const imagePathOriginal = path.join(__dirname, './artworks', imageName);
  const imagePathProcessed = path.join(__dirname, './artworks', `processed_${imageName}`);

  fs.writeFileSync(imagePathOriginal, Buffer.from(response.data, 'binary'));

  await sharp(imagePathOriginal)
    .resize({ width: maxDimension, height: maxDimension, fit: 'inside' })
    .toFile(imagePathProcessed);

  // fs.unlinkSync(imagePathOriginal);

  return imagePathProcessed;
}

function generateImageName() {
  const uniqueId = Date.now();
  return `image_${uniqueId}.jpg`;
}

module.exports = router;
