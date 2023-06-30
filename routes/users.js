const express = require('express');
const usersController = require('../controllers/users_controller');

const router = express.Router();

router.get('/profile', usersController.profile);
router.get('/settings', usersController.settings);

module.exports = router;


