var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var ConsumerTableOrderSchema = require('./schema/consumerTableOrder');

var ConsumerTableOrder = (function () {

    var model = ConsumerTableOrderSchema;

    function find(f) {
        model.find().exec(f);
    }
    
    function findById(id, f) {
        model.findById(id).exec(f);
    }
    
    function save(body, f) {
        var consumerTableOrder = new model(body);
        consumerTableOrder.save(f);
    }
    
    function update(id, body, f) {
        model.findByIdAndUpdate(id, {$set: body}, {new: true}).exec(f);
    }
    
    function removeById(id, f) {
        model.findById(id).remove().exec(f);
    }
    
    return {
        find: find,
        findById: findById,
        save: save,
        update: update,
        removeById: removeById
    };

})(ConsumerTableOrder || {});

module.exports = ConsumerTableOrder;