const express = require('express');
const router = express.Router();
const db = require('../connection');

router.delete('/artworks/:artwork_id', (req, res) => {
  const { artwork_id } = req.params;

  const deleteQuery = `
    DELETE FROM artworks
    WHERE artwork_id = ?
  `;

  db.query(deleteQuery, [artwork_id], (error, results) => {
    if (error) {
      console.error('Error deleting artwork:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'Artwork deleted successfully' });
  });
});

module.exports = router;
