var express = require('express');
var router = express.Router();

var MenuDishController = require('../controllers/menuDish');
var CommonMiddleware = require('../middleware/common');

router.get('/list/', MenuDishController.list);
router.post('/save/', MenuDishController.save);
router.post('/remove/:id?', [CommonMiddleware.validIdParam], MenuDishController.remove);

module.exports = router;