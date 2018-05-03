var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var menuCategorySchema = new Schema({
    name: String
});


var MenuCategory = mongoose.model('MenuCategory', menuCategorySchema, 'collection-menuCategory');

module.exports = MenuCategory;