var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var laborTypeSchema = new Schema({
    name: String,
    identifier: Number
});

var LaborType = mongoose.model('LaborType', laborTypeSchema, 
    'collection-laborType');

module.exports = LaborType;