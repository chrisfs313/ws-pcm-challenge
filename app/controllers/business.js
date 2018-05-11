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
        
        BusinessModel.getUsersById(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
    }
    
    return {
        list: list,
        usersById: usersById
    };
})(Business || {});
module.exports = Business;