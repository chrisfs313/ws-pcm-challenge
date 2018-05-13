var mongoose = require('mongoose');

var ConsumerTableModel = require('../models/consumerTable');
var ConsumerTableOrderModel = require('../models/consumerTableOrder');
var ConsumerTableOrderSchema = require('../models/schema/consumerTableOrder');
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
                            var cm = consumerMenus[i];
                            var hasIdConsumerOrder = cm.idConsumerOrder.length > 0;
                            
                            if((hasIdConsumerOrder && !ValidHelper.isObjectId(cm.idConsumerOrder)) ||
                                !ValidHelper.isObjectId(cm.idConsumerMenu) ||
                                !ValidHelper.isObjectId(cm.idOrderStatusType)) {
                                    
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
                                var countModel = 0;
                                
                                for (var i = 0; i < consumerMenus.length; i++) {
                                    var idConsumerOrder = consumerMenus[i].idConsumerOrder;
                                    var idConsumerMenu = consumerMenus[i].idConsumerMenu;
                                    var idOrderStatusType = consumerMenus[i].idOrderStatusType;
                                    
                                    var consumerTableOrderBody = {
                                        idMenuDish: idConsumerMenu,
                                        idOrderStatusType: idOrderStatusType,
                                    };
                                    
                                    switch (idOrderStatusType) {
                                        case constants.orderStatusType.borrado:
                                            ConsumerTableOrderModel.removeById(idConsumerOrder,
                                                function (ctomError, ctomData) {
                                                    if (ctomError) {
                                                        next(ctomError);
                                                    } 
                                                    else {
                                                        countModel++;
                                                        // Process ConsumerTableModel
                                                        // Now update the table: ConsumerTableModel, and response.
                                                        processConsumerTableModel(
                                                            consumerMenus, 
                                                            consumerTable, 
                                                            {
                                                                _id: idConsumerOrder,
                                                                isNew: false,
                                                                isErased: true
                                                            }, 
                                                            countModel, 
                                                            res);
                                                    }
                                                });
                                            break;
                                        case constants.orderStatusType.recienPedido:
                                            consumerTableOrderBody.idOrderStatusType = constants.orderStatusType.pendiente;
                                            
                                            // Save to: ConsumerTableOrder
                                            ConsumerTableOrderModel.save(consumerTableOrderBody, 
                                                function (ctomError, ctomData) {
                                                    if (ctomError) {
                                                        next(ctomError);
                                                    } 
                                                    else {
                                                        countModel++;
                                                        
                                                        // Process ConsumerTableModel
                                                        // Now update the table: ConsumerTableModel, and response.
                                                        processConsumerTableModel(
                                                            consumerMenus, 
                                                            consumerTable, 
                                                            {
                                                                _id: ctomData._id,
                                                                isNew: true,
                                                                isErased: false
                                                            }, 
                                                            countModel, 
                                                            res);
                                                    }
                                                });
                                            break;
                                        default:
                                            // Update to: ConsumerTableOrder
                                            ConsumerTableOrderModel.update(idConsumerOrder, consumerTableOrderBody, 
                                                function (ctomError, ctomData) {
                                                    if (ctomError) {
                                                        next(ctomError);
                                                    }
                                                    else {
                                                        countModel++;
                                                        
                                                        // Process ConsumerTableModel
                                                        // Now update the table: ConsumerTableModel, and response.
                                                        processConsumerTableModel(
                                                            consumerMenus, 
                                                            consumerTable, 
                                                            undefined, 
                                                            countModel, 
                                                            res);
                                                    }
                                                });
                                            break;
                                    }
                                    
                                    function processConsumerTableModel(consumerMenus, consumerTable, 
                                        ctomData, countModel, res) {
                                        
                                        // Add the recently: ConsumerTableOrderModel
                                        if (ctomData) {
                                            if (ctomData.isNew) {
                                                // Add new one
                                                consumerTable.consumerMenus.push(ctomData._id);
                                            }
                                            else if (ctomData.isErased) {
                                                // Remove it
                                                for (var k = 0; k < consumerTable.consumerMenus.length; k++) {
                                                    if (consumerTable.consumerMenus[k] === ctomData._id) {
                                                        consumerTable.consumerMenus.splice(k, 1);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        
                                        // Now update the table: ConsumerTableModel, and response.
                                        if (countModel >= consumerMenus.length) {
                                            ConsumerTableModel.update(id, consumerTable, function (ctmError, ctmData) {
                                                if (ctmError) {
                                                    next(ctmError);
                                                } 
                                                else {
                                                    ctmData.isOccupied = ctmData.isOccupied ? 1 : 0;
                                                        
                                                    // Now return the data
                                                    res.json(ctmData);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            consumerTable.set('idWaiterUser', null);
                            consumerTable.set('consumerMenus', []);
                            
                            // Clear consumer Menus
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
                }
            });
    }
    
    function getOrdersByTable(req, res, next) {
        var id = req.params.id;
        
        ConsumerTableModel.getOrdersByTableId(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
    }
    
    return {
        list: list,
        listActivesByBusiness: listActivesByBusiness,
        setTableOccupied: setTableOccupied,
        getOrdersByTable: getOrdersByTable
    };
})(ConsumerTable || {});
module.exports = ConsumerTable;