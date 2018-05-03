var mongoose = require('mongoose');

var BusinessModel = require('../models/business');
var UserModel = require('../models/user');

var Business = (function () {
    
    function list(req, res, next) {
        BusinessModel.find(function (e, d) {
            if (e) {
                next(e);
            } else {
                res.json(d);
            }
        });
    }
    
    function search(req, res, next) {
        BusinessModel.findBy(req.body, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
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
        usersById: usersById,
        search: search
    };
})(Business || {});
module.exports = Business;