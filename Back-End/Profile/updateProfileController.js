const express = require('express');
const router = express.Router();
const db = require('../connection');

router.put('/profiles/:user_id', updateProfile);

function updateProfile(req, res) {
  const user_id = req.params.user_id;
  const { artist_name, description, profile_image_url, background_image_url } = req.body;

  if (!user_id || (!artist_name && !description && !profile_image_url && !background_image_url)) {
    return res.status(400).json({ error: 'At least one field to update is required' });
  }

  const query = 'UPDATE catora_user_profiles SET artist_name = ?, description = ?, profile_image_url = ?, background_image_url = ? WHERE user_id = ?';
  db.query(query, [artist_name, description, profile_image_url, background_image_url, user_id], (error, results) => {
    if (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  });
}

module.exports = router;
