const express = require('express');
const router = express.Router();
const getProfileController = require('./getProfileController');
const updateProfileController = require('./updateProfileController');

router.get('/profile/:user_id', getProfileController);
router.put('/profile/:user_id', updateProfileController);

module.exports = router;
