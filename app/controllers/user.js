var mongoose = require('mongoose');

var UserModel = require('../models/user');
var SHA256 = require("crypto-js/sha256");

var User = (function () {
    
    function login(req, res, next) {
        var dni = req.body.dni;
        
        UserModel.findByDNI(dni, function (e, d) {
            var response = {
                success: false,
                user: {
                    name: "",
                    lastName: "",
                    dni: "",
                    idLaborType: 0
                }
            };  
            
            if (e) {
                next(e);
            } else {
                console.log("d", d);
                
                if (d) {
                    var password = SHA256(req.body.password).toString();
                    console.log("password", password);
                    if (d.password === password) {
                        response.user.name = d.name;
                        response.user.lastName = d.lastName;
                        response.user.dni = d.dni;
                        response.user.idLaborType = d.idLaborType;
                        
                        response.success = true;
                    }
                }
                
                res.json(response);
            }
        });
    }
    
    return {
        login: login
    };
})(User || {});
module.exports = User;