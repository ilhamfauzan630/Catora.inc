const express = require('express');
const router = express.Router();
const db = require('../connection');

router.get('/profiles/:user_id', getProfile);

function getProfile(req, res) {
  const user_id = req.params.user_id;

  const query = 'SELECT * FROM catora_user_profiles WHERE user_id = ?';
  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  });
}

module.exports = router;
