var constants = {
    errors: {
        //100 GENERICO
        notExist: {code: 101, msg: 'El registro especificado no existe.'},
        //validate data
        invalid: {code: 102, msg: 'Los datos enviados no son válidos.'},
        //200 USUARIO
        userAuthNotFound: {code: 203, msg: 'Autenticación incorrecta. El Usuario no existe.',},
        userAuthIncorrect: {code: 205, msg: 'Autenticación incorrecta. Datos ingresados no son correctos.',},

    }
};

module.exports = constants;