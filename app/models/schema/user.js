var mongoose = require('mongoose');
var valid = require('../../helpers/valid');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: String,
    lastName: String,
    dni: String,
    password: String,
    isAvailable: { type: Boolean, default: true },
    idLaborType: {type: ObjectId, ref: 'LaborType', validate: valid.isObjectId},
    creationDate: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema, 'collection-user');

module.exports = User;