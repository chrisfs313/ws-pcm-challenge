var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var ConsumerTableSchema = require('./schema/consumerTable');

var ConsumerTable = (function () {

    var model = ConsumerTableSchema;

    function find(f) {
        model.find().exec(f);
    }

    function findById(id, f) {
        model.findById(id).exec(f);
    }
    
    function findByBusinessId(id, f) {
        var query = [];
            
        query.push({ $match: { "idBusiness": mongoose.Types.ObjectId(id) } });
            
        // Now finally filters which properties to show
        query.push({
            $project: {
                _id: 1,
                name: 1,
                size: 1,
                isOccupied: 1,
                idWaiterUser: 1,
                consumerCount: 1
            }
        });
            
        model.aggregate(query, f);
    }
    
    function save(body, f) {
        var consumerTable = new model(body);
        consumerTable.save(f);
    }
    
    function update(id, body, f) {
        model.findByIdAndUpdate(id, {$set: body}, {new: true}).exec(f);
    }

    return {
        find: find,
        findById: findById,
        findByBusinessId: findByBusinessId,
        save: save,
        update: update
    };

})(ConsumerTable || {});

module.exports = ConsumerTable;