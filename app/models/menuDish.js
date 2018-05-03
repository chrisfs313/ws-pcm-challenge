var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var MenuDishSchema = require('./schema/menuDish');

var MenuDish = (function () {

    var model = MenuDishSchema;

    function find(f) {
        model.find().exec(f);
    }
    
    function findBy(params, f) {
        var nameFiler = new RegExp((params.name || ''), 'i');
        var description = params.description || '';
        
        // Required filters: Name
        var filters = {
            name: nameFiler,
        };

        // Optional filter: Description
        if (description && description.length) {
            filters.description = {'$in': description};
        }

        model
            .find(filters)
            .sort('-price')
            .exec(f);
    }

    function findById(id, f) {
        model.findById(id).exec(f);
    }

    function save(body, f) {
        var menuDish = new model(body);
        menuDish.save(f);
    }

    function update(id, body, f) {
        model.findByIdAndUpdate(id, {$set: body}, {new: true}).exec(f);
    }

    function removeById(id, f) {
        model.findById(id).remove().exec(f);
    }

    /*function valorar(id, needEdit, body, f) {
        if (needEdit) {
            model.find({
                _id: id,
                "valoraciones.usuario": body.valoraciones.usuario
            }, function (e, d) {
                if (e) {
                    f(e, d);
                } else {
                    if (d && d.length) {
                        var fil = d[0].valoraciones.filter(function (p1, p2, p3) {
                            return p1.usuario == body.valoraciones.usuario;
                        });
                        model.findByIdAndUpdate(id, {
                            $pull: {
                                valoraciones: {usuario: body.valoraciones.usuario}
                            },
                            $inc: {valoracion_total: fil[0].calificacion * -1}
                        }, {new: true}, function (e, d) {
                            model.findByIdAndUpdate(id, {
                                $push: body,
                                $inc: {valoracion_total: body.valoraciones.calificacion}
                            }, {new: true}, function (e, d) {
                                model.update({_id: id}, {
                                    $set: {valoracion: d.valoracion_total / (d.valoraciones.length || 1)}
                                }, f);
                            });
                        });
                    } else {
                        f(e, d);
                    }
                }
            });

        } else {
            model.findByIdAndUpdate(id, {
                $push: body,
                $inc: {valoracion_total: body.valoraciones.calificacion}
            }, {new: true}, function (e, d) {
                model.update({_id: id}, {
                    $set: {valoracion: d.valoracion_total / (d.valoraciones.length || 1)}
                }, f);
            });
        }
    }*/

    return {
        find: find,
        findBy: findBy,
        findById: findById,
        save: save,
        update: update,
        removeById: removeById
    };

})(MenuDish || {});

module.exports = MenuDish;