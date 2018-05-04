var express = require('express');
var router = express.Router();

var ConsumerTableController = require('../controllers/consumerTable');
var CommonMiddleware = require('../middleware/common');

router.get('/list/', ConsumerTableController.list);
router.get('/listActivesByBusiness/:id', [CommonMiddleware.validIdParam], ConsumerTableController.listActivesByBusiness);
router.post('/setTableOccupied/:id/:occupied/:consumerCount', [CommonMiddleware.validIdParam], ConsumerTableController.setTableOccupied);
router.get('/getOrdersByTable/:id', [CommonMiddleware.validIdParam], ConsumerTableController.getOrdersByTable);

module.exports = router;