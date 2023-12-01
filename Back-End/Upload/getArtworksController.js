const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/artworks', (req, res) => {
  const selectQuery = `
    SELECT * FROM artworks
  `;

  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error fetching artworks:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
