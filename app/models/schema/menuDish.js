var mongoose = require('mongoose');
var valid = require('../../helpers/valid');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var menuDishSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    isAvailable: { type: Boolean, default: true },
    idMenuCategory: {type: ObjectId, ref: 'MenuCategory', validate: valid.isObjectId},
    creationDate: { type: Date, default: Date.now }
});

var MenuDish = mongoose.model('MenuDish', menuDishSchema, 'collection-menuDish');

module.exports = MenuDish;