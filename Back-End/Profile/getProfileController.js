const express = require('express');
const router = express.Router();
const db = require('../connection');
const { resolve } = require('url');

router.get('/profile/:user_id', (req, res) => {
  const { user_id } = req.params;

  const getProfileQuery = 'SELECT * FROM catora_user_profiles WHERE user_id = ?';

  db.query(getProfileQuery, [user_id], (error, results) => {
    if (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const userProfile = results[0];

    // Menambahkan URL lengkap untuk gambar dari folder lokal
    userProfile.profile_image_url = userProfile.profile_image_url
      ? resolve('http://localhost:3000', userProfile.profile_image_url)
      : null;

    userProfile.background_image_url = userProfile.background_image_url
      ? resolve('http://localhost:3000', userProfile.background_image_url)
      : null;

    res.status(200).json(userProfile);
  });
});

module.exports = router;
