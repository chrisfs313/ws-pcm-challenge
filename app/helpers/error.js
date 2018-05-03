var Error = (function () {

    var env, err;

    function setDevelopment(_env){
        env = _env;
    }

    function setError(_err){
        err = _err;
    }

    function print(){

        var data = {};

        data.code = err.status;
        data.name = err.name;
        data.message = err.message;

        if(env){
            data.stack = err.stack;
            if(err.errors){
                data.errors = err.errors;
            }
        }

        return data;

    }

    return {
        setDevelopment: setDevelopment,
        setError: setError,
        print: print
    }

})(Error || {});

module.exports = Error;