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
        query.push({ $sort : { name : 1 } });
            
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
    
    function getOrdersByTableId(id, f) {
        model
            .findById(id)
            .populate({
                path: 'consumerMenus',
                select: {
                    description: 0,
                    idMenuCategory: 0,
                    __v: 0,
                    creationDate: 0,
                    isAvailable: 0
                    
                }
            })
            .populate({
                path: 'idWaiterUser',
                select: {
                    dni: 0,
                    idLaborType: 0,
                    creationDate: 0,
                    isAvailable: 0
                }
            })
            .select({ 
                idBusiness: 0, 
                __v: 0, 
                isOccupied: 0, 
                consumerCount: 0, 
                size: 0
            })
            .exec(f);
        
        /*var query = [];
            
        query.push({ $match: { "_id": mongoose.Types.ObjectId(id) } });
            
        query.push({
                $lookup: {
                    from: "collection-menuDish",
                    localField: "consumerMenus",
                    foreignField: "_id",
                    as: "consumerMenus"
                }
            });
            
        query.push({
                $lookup: {
                    from: "collection-user",
                    localField: "idWaiterUser",
                    foreignField: "_id",
                    as: "waiter"
                }
            });
            
        query.push({
        	$unwind: "$waiter" 
        });
            
        query.push({
            $project: {
                _id: 1,
                name: 1,
                waiter: {
                	_id: 1,
                	fullName: { $concat: [ "$waiter.name", " ", "$waiter.lastName" ] }
                },
                consumerMenus: {
                    _id: 1,
               		name: 1,
               		price: 1,
               		imageUrl: 1
                }
            }
        });
        
        model.aggregate(query, f);*/
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
        getOrdersByTableId: getOrdersByTableId,
        save: save,
        update: update
    };

})(ConsumerTable || {});

module.exports = ConsumerTable;