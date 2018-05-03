var messages = {
    //para los mensajes de middleware
    validData: {
        notEmpty: {
            generic: 'El campo :campo es obligatorio.',
            param: 'El parámetro :campo es obligatorio.',
        },
        isAlphanumeric: {
            generic: 'El campo :campo debe ser alfanumérico.',
        },
        isAlphanumericSpace: {
            generic: 'El campo :campo debe ser alfanumérico.',
        },
        isAddress: {
            generic: 'el campo :campo debe ser una dirección válida.',
        },
        isNumeric: {
            generic: 'El campo :campo debe ser numérico.',
            dni: 'El campo :campo debe ser un DNI válido.'
        },
        isEmail: {
            generic: 'El campo :campo no tiene un formato de email válido.',
        },
        isArray: {
            generic: 'El campo :campo debe ser un array.',
        },
        isBoolean: {
            generic: 'El campo :campo debe ser booleano.',
        },
        isMongoId: {
            generic: 'El campo :campo debe ser un id de MongoDB.',
        }
    },
    custom: function (v, m) {
        return m.replace(':campo', v);
    },
    formaterError: function (errors) {
        var formatError = {};
        errors.forEach(function (cur, idx, ar) {
            formatError[cur.param] = formatError[cur.param] || [];
            formatError[cur.param].push({message: cur.msg, value: cur.value});
        });
        return formatError;
    },
};

module.exports = messages;