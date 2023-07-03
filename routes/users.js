const express = require('express');
const usersController = require('../controllers/users_controller');

const router = express.Router();

router.get('/profile', usersController.profile);
router.get('/settings', usersController.settings);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

module.exports = router;


