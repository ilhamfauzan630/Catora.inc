const express = require('express');
const router = express.Router();
const db = require('../connection');

router.post('/artworks', (req, res) => {
  const { user_id, title, description, tags, image_url } = req.body;

  const insertQuery = `
    INSERT INTO artworks (user_id, title, description, tags, image_url)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertQuery, [user_id, title, description, tags, image_url], (error, results) => {
    if (error) {
      console.error('Error creating artwork:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'Artwork created successfully' });
  });
});

module.exports = router;
