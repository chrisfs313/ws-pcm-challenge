var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var MenuCategorySchema = require('./schema/menuCategory');

var MenuCategory = (function () {

    var model = MenuCategorySchema;

    function find(f) {
        model.find().exec(f);
    }
    
    function findBy(params, f) {
        var nameFiler = new RegExp((params.name || ''), 'i');
        
        // Required filters: Name
        var filters = {
            name: nameFiler,
        };
        
        model
            .find(filters)
            .exec(f);
    }

    function findById(id, f) {
        model.findById(id).exec(f);
    }

    return {
        find: find,
        findBy: findBy,
        findById: findById
    };

})(MenuCategory || {});

module.exports = MenuCategory;