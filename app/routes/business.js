var express = require('express');
var router = express.Router();

var BusinessController = require('../controllers/business');

router.get('/list/', BusinessController.list);
router.get('/usersById/:id', BusinessController.usersById);

module.exports = router;