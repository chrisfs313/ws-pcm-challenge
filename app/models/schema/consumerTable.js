var mongoose = require('mongoose');
var valid = require('../../helpers/valid');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var consumerTableSchema = new Schema({
    name: String,
    size: { type: Number, default: 4 },
    consumerCount: { type: Number, default: 0 },
    consumerMenus: [{type: ObjectId, ref: 'ConsumerTableOrder', validate: valid.isObjectId, default: []}],
    isOccupied: { type: Boolean, default: false },
    idBusiness: {type: ObjectId, ref: 'Business', validate: valid.isObjectId},
    idWaiterUser: {type: ObjectId, ref: 'User', validate: valid.isObjectId, default: null}
});

var ConsumerTable = mongoose.model('ConsumerTable', consumerTableSchema, 'collection-consumerTable');

module.exports = ConsumerTable;