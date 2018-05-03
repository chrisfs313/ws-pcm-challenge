var mongoose = require('mongoose');

var MenuCategoryModel = require('../models/menuCategory');

var MenuCategory = (function () {
    
    function list(req, res, next) {
        var id = req.params.id;
        
        if (id) {
            MenuCategoryModel.findById(id, function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        } else {
            MenuCategoryModel.find(function (e, d) {
                if (e) {
                    next(e);
                } else {
                    res.json(d);
                }
            });
        }
    }
    
    return {
        list: list
    };
})(MenuCategory || {});
module.exports = MenuCategory;