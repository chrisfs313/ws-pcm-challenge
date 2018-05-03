var mongoose = require('mongoose');

var MenuDishModel = require('../models/menuDish');

var MenuDish = (function () {
    
    function list(req, res, next) {
        var id = req.params.id;
        
        if (id) {
            MenuDishModel.findById(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        } else {
            MenuDishModel.find(function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        }
    }
    
    function save(req, res, next) {
        var id = req.body._id;

        if (id) {
            MenuDishModel.update(id, req.body, function (e, d) {
                    if (e) {
                        next(e);
                    } else {
                        res.json(d);
                    }
                });
        }
        else {
           MenuDishModel.save(req.body, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        }
    }
    
    function remove(req, res, next) {
        var id = req.params.id;
        
        if (id) {
            MenuDishModel.removeById(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        }
    }
    
    return {
        list: list,
        save: save,
        remove: remove
    };
})(MenuDish || {});
module.exports = MenuDish;