var mongoose = require('mongoose');

var MenuDishModel = require('../models/menuDish');

var AWS = require('aws-sdk');
var uuid = require('node-uuid');

AWS.config.update({
    accessKeyId: "AKIAJ2WNTJUBNBVGXBFA",
    secretAccessKey: "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",
    region: "sa-east-1"
});

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
            var files = req.body.imageData;
        
            if (files) {
                var s3 = new AWS.S3();
                var fileBody = new Buffer(files, 'base64');
                var keyName = 'file-' + uuid.v4() + ".jpg";
                var params = {
                    Bucket: 'pcm-challenge-s3', /* required */
                    Key: keyName, /* required */
                    ACL: 'public-read',
                    Body: fileBody,
                    ContentEncoding: 'base64',
                    ContentType: req.body.mimeType
                };
                s3.putObject(params, function (err, data) {
                    if (err) {
                        // console.log(err, err.stack);
                        next(err);
                    } else {
                        var urlDir = "https://s3-sa-east-1.amazonaws.com/pcm-challenge-s3/" + keyName;
                        
                        // Now change the galeria object
                        req.body.imageUrl = urlDir;
                        
                        MenuDishModel.save(req.body, function (e, d) {
                            if (e) {
                                next(e);
                            } else {
                                d.imageUrl = urlDir;
                                res.json(d);
                            }
                        });
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