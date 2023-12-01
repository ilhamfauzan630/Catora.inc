const express = require('express');
const router = express.Router();
const db = require('../connection');

router.put('/artworks/:artwork_id', (req, res) => {
  const { artwork_id } = req.params;
  const { title, description, tags, image_url } = req.body;

  const updateQuery = `
    UPDATE artworks
    SET title = ?, description = ?, tags = ?, image_url = ?
    WHERE artwork_id = ?
  `;

  db.query(updateQuery, [title, description, tags, image_url, artwork_id], (error, results) => {
    if (error) {
      console.error('Error updating artwork:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'Artwork updated successfully' });
  });
});

module.exports = router;
