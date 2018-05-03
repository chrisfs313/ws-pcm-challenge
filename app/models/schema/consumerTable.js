var mongoose = require('mongoose');
var valid = require('../../helpers/valid');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var consumerTableSchema = new Schema({
    size: Number,
    consumerCount: Number,
    consumerMenus: [{type: ObjectId, ref: 'MenuDish', validate: valid.isObjectId}],
    isOccupied: { type: Boolean, default: true },
    idBusiness: {type: ObjectId, ref: 'Business', validate: valid.isObjectId},
    idWaiterUser: {type: ObjectId, ref: 'User', validate: valid.isObjectId}
});

var ConsumerTable = mongoose.model('ConsumerTable', consumerTableSchema, 'collection-consumerTable');

module.exports = ConsumerTable;