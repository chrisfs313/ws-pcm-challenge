var mongoose = require('mongoose');
var valid = require('../../helpers/valid');
var constants = require('../../helpers/constants');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var consumerTableOrderSchema = new Schema({
    idMenuDish: { type: ObjectId, ref: 'MenuDish', validate: valid.isObjectId },
    idOrderStatusType: { 
        type: ObjectId, ref: 'OrderStatusType', 
        validate: valid.isObjectId
    }
});

var ConsumerTableOrder = mongoose.model('ConsumerTableOrder', consumerTableOrderSchema, 
    'collection-consumerTableOrder');

module.exports = ConsumerTableOrder;