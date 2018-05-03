var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var UserSchema = require('./schema/user');

var User = (function () {

    var model = UserSchema;

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

})(User || {});

module.exports = User;