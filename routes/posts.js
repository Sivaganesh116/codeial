const express = require('express');
const postsController = require('../controllers/posts_controller');

const router = express.Router();

router.post('/create', postsController.create);

module.exports = router;