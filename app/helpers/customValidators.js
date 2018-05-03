var constants = require('./constants');

var customFunctionValidator = {
    customValidators: {
        isArray: function (value) {
            return Array.isArray(value);
        },
        isAlphanumericSpace: function (value) {
            var str = /^[0-9A-ZÁÉÍÑÓÚÜ\s]+$/i;
            return str.test(value);
        },
        isAddress: function (value) {
            var str = /^[0-9A-ZÁÉÍÑÓÚÜ\s\-_.,&#"'*()]+$/i;
            return str.test(value);
        }
    }
};
module.exports = customFunctionValidator;