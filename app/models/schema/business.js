var mongoose = require('mongoose');
var valid = require('../../helpers/valid');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var businessSchema = new Schema({
    name: String,
    address: String,
    employees: [{ type: ObjectId, ref: 'User', validate: valid.isObjectId}],
    creationDate: { type: Date, default: Date.now }
});

var Business = mongoose.model('Business', businessSchema, 'collection-business');

module.exports = Business;