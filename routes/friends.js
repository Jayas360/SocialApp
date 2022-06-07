const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends_controller');

router.get('/create/:id', friendsController.create);

router.get('/remove/:id', friendsController.remove);

module.exports = router;