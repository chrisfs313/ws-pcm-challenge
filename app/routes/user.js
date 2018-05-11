var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.post('/login/', UserController.login);

module.exports = router;