var mongoose = require('mongoose');

var BusinessModel = require('../models/business');
var UserModel = require('../models/user');

var Business = (function () {
    
    function list(req, res, next) {
        var id = req.params.id;
        
        if (id) {
            BusinessModel.findById(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        } else {
            BusinessModel.find(function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        }
    }
    
    function usersById(req, res, next) {
        var id = req.params.id;
        
        if (id) {
            var query = [
            {
                $lookup: {
                    from: "collection-user",
                    localField: "employees",
                    foreignField: "_id",
                    as: "user"
                }
                /*,{
                $lookup: {
                    from: "collection-laborType",
                    localField: "user.idLaborType",
                    foreignField: "_id",
                    as: "user.laborType"
                }
            }*/
            }
            
            //,{ $unwind: { path: "$laborType" } }
        ];
        
query.push({
            $project: {
                _id: 1,
                name: 1,
                user: 1
            }
        });

db['collection-business'].aggregate(query);
            
            
            /*BusinessModel.findById(id, function (e, d) {
                if (e) {
                    next(e);
                } 
                else {
                    var userResult = [];
                    
                    for (var i = 0; i < d.employees.length; i++) {
                        var userId = d.employees[i];
                        
                        UserModel.findById(userId, function (e, d) {
                            if (e) { next(e); } 
                            else {
                                userResult.push(d);
                            }
                        });
                    }
                    
                    res.json(userResult);
                }
            });*/
        }
    }
    
    return {
        list: list,
        usersById: usersById
    };
})(Business || {});
module.exports = Business;