var express = require('express');
var router = express.Router();

var MenuCategoryController = require('../controllers/menuCategory');

router.get('/list/', MenuCategoryController.list);

module.exports = router;