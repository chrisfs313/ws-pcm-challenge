var messages = require('../helpers/messages');
var constants = require('../helpers/constants');

var Common = (function () {

    function validIdParam(req, res, next) {
        req.checkParams({
            'id': {
                notEmpty: {errorMessage: messages.custom('id', messages.validData.notEmpty.param)},
                isMongoId: {errorMessage: messages.custom('id', messages.validData.isMongoId.generic)},
            },
        });

        var errors = req.validationErrors();

        if (errors) {
            return res.json({
                _error: true,
                type: constants.errors.invalid.code,
                message: constants.errors.invalid.msg,
                invalid: messages.formaterError(errors),
            });
        } else {
            next();
        }

    }
    
    return {
        validIdParam: validIdParam
    };
})(Common || {});
module.exports = Common