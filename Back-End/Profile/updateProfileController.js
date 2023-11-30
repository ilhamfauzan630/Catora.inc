const express = require('express');
const router = express.Router();
const db = require('../connection');

router.put('/profile/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { artist_name, description, profile_image_url, background_image_url } = req.body;

  const updateProfileQuery = `
    UPDATE catora_user_profiles
    SET artist_name = ?, description = ?, profile_image_url = ?, background_image_url = ?
    WHERE user_id = ?
  `;

  db.query(updateProfileQuery, [artist_name, description, profile_image_url, background_image_url, user_id], (error, results) => {
    if (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

module.exports = router;
