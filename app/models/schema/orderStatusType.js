var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var orderStatusTypeSchema = new Schema({
    name: String,
    identifier: Number
});

var OrderStatusType = mongoose.model('OrderStatusType ', orderStatusTypeSchema, 
    'collection-orderStatusType');

module.exports = OrderStatusType;