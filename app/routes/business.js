var express = require('express');
var router = express.Router();

var BusinessController = require('../controllers/business');
var CommonMiddleware = require('../middleware/common');

router.get('/list/', BusinessController.list);
router.post('/search/', BusinessController.search);
router.get('/usersById/:id', [CommonMiddleware.validIdParam], BusinessController.usersById);

module.exports = router;