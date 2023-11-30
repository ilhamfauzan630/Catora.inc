const express = require('express');
const router = express.Router();
const db = require('../connection');

router.delete('/profiles/:user_id', deleteProfile);

function deleteProfile(req, res) {
  const user_id = req.params.user_id;

  const query = 'DELETE FROM catora_user_profiles WHERE user_id = ?';
  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error('Error deleting profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Profile deleted successfully' });
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  });
}

module.exports = router;
