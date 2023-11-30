const express = require('express');
const router = express.Router();
const getProfileController = require('./getProfileController');
const updateProfileController = require('./updateProfileController');
const deleteProfileController = require('./deleteProfileController');

// Create a profile

// Get a profile
router.get('/profile/:user_id', getProfileController);

// Update a profile
router.put('/profile/:user_id', updateProfileController);

// Delete a profile
router.delete('/profile/:user_id', deleteProfileController);

module.exports = router;
