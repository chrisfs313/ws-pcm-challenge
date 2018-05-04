var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var BusinessSchema = require('./schema/business');

var Business = (function () {

    var model = BusinessSchema;

    function find(f) {
        var query = [];
    
		query.push({
            $project: {
                _id: 1,
                name: 1,
                direccion: 1
            }
        });
    
        model.aggregate(query, f);
    }
    
    function findBy(body, f) {
        var name = body.name;
        var address = body.address;
        
        var query = [];
            
        if (name) {
            query.push({ $match: { "name": { $regex: new RegExp(name) } } });
        }
            
        if (address) {
            query.push({ $match: { "address": { $regex: new RegExp(address) } } });
        }
            
        // Now finally filters which properties to show
        query.push({
            $project: {
                _id: 1,
                name: 1,
                address: 1
            }
        });
            
        model.aggregate(query, f);
    }

    function findById(id, f) {
        model.findById(id).exec(f);
    }
    
    function getUsersById(id, f) {
        var query = [
            {
                $match: { "_id": mongoose.Types.ObjectId(id) }
            }
            ,{
                $lookup: {
                    from: "collection-user",
                    localField: "employees",
                    foreignField: "_id",
                    as: "user"
                }
            }
            ,{
            	$unwind: "$user"
            }
            ,{
                $lookup: {
                    from: "collection-laborType",
                    localField: "user.idLaborType",
                    foreignField: "_id",
                    as: "laborType"
                }
            }
            ,{
                $project: {
                    _id: 0,
                    user: 1,
                    laborType:  {
                    	name: 1,
                    	identifier: 1 
                    }
                }
            }];
            
        model.aggregate(query, f);
    }

    return {
        find: find,
        findBy: findBy,
        findById: findById,
        getUsersById: getUsersById
    };

})(Business || {});

module.exports = Business;