var express = require('express');
var router = express.Router();

var MenuDishController = require('../controllers/menuDish');

router.get('/list/', MenuDishController.list);
router.post('/save/:id?', MenuDishController.save);
router.post('/remove/:id?', MenuDishController.remove);

module.exports = router;