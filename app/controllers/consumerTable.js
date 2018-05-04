var mongoose = require('mongoose');

var ConsumerTableModel = require('../models/consumerTable');
var ValidHelper = require('../helpers/valid');
var constants = require('../helpers/constants');
var messages = require('../helpers/messages');

var ConsumerTable = (function () {
    
    function list(req, res, next) {
        ConsumerTableModel.find(function (e, d) {
                if (e) {
                    next(e);
                } else {
                    for (var i = 0; i < d.length; i++) {
                        d[i].isOccupied = d[i].isOccupied ? 1 : 0;
                    }
                    
                    res.json(d);
                }
            });
    }
    
    function listActivesByBusiness(req, res, next) {
        var id = req.params.id;
        
        ConsumerTableModel.findByBusinessId(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    for (var i = 0; i < d.length; i++) {
                        d[i].isOccupied = d[i].isOccupied ? 1 : 0;
                    }
                    
                    res.json(d);
                }
            });
    }
    
    function setTableOccupied(req, res, next) {
        var id = req.params.id;
        var occupied = req.params.occupied === "1" ? true : false;
        var consumerCount = Number(req.params.consumerCount) || 0;
        consumerCount = consumerCount < 0 ? 0 : consumerCount;
        
        ConsumerTableModel.findById(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    var consumerTable = d;
                    consumerTable.set('isOccupied', occupied);
                    consumerTable.set('consumerCount', occupied ? consumerCount : 0);
                    
                    var objectIdWrong = false;
                    var idWaiterUser = req.body.idWaiterUser;
                    var consumerMenus = req.body.consumerMenus;
                    var hasConsumerMenus = consumerMenus && consumerMenus.length > 0;
                    
                    // validate if the menus are valid
                    if (occupied && hasConsumerMenus) {
                        for (var i = 0; i < consumerMenus.length; i++) {
                            if(!ValidHelper.isObjectId(consumerMenus[i])) {
                                objectIdWrong = true;
                                break;
                            }
                        }
                    } 
                
                    if (objectIdWrong) {
                        // If is wrong a menu throw an error
                        res.json({
                            _error: true,
                            type: constants.errors.invalid.code,
                            message: constants.errors.invalid.msg,
                            invalid: {},
                        });
                    }
                    else {
                        // Now set the waiter attending the table
                        if (occupied) {
                            if (idWaiterUser) {
                                consumerTable.set('idWaiterUser', mongoose.Types.ObjectId(idWaiterUser));
                            }
                            
                            if (hasConsumerMenus) {
                                consumerTable.set('consumerMenus', consumerMenus);
                            }
                        }
                        else {
                            consumerTable.set('idWaiterUser', null);
                            consumerTable.set('consumerMenus', []);
                        }
                        
                        ConsumerTableModel.update(id, consumerTable, function (updateError, updateData) {
                            if (updateError) {
                                next(updateError);
                            } else {
                                updateData.isOccupied = updateData.isOccupied ? 1 : 0;
                                    
                                res.json(updateData);
                            }
                        });
                    }
                }
            });
    }
    
    return {
        list: list,
        listActivesByBusiness: listActivesByBusiness,
        setTableOccupied: setTableOccupied
    };
})(ConsumerTable || {});
module.exports = ConsumerTable;