var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var router = require('./app/router');
var config = require('./app/config/config');
var error = require('./app/helpers/error');

var app = express();
// This fixes the CORS issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.listen(process.env.PORT, () => { 
    console.log('Server running as: ' + process.env.C9_HOSTNAME); 
});

// DB

mongoose.connect(config.db);
mongoose.connection.on('connected', function () {
    console.log('connected');
});
mongoose.connection.on('error', function (err) {
    console.error('error', err);
});
mongoose.connection.on('disconnected', function () {
    console.warn('disconnected');
});


app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
for (var r in config.routes) {
    if (config.routes.hasOwnProperty(r)) {
        app.use(config.routes[r], router[r]);
    }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (config.env === config.codes.ENV.DEVELOPMENT) {
    // development error handler
    // will print stacktrace
    app.use(function (err, req, res, next) {
        err.status = err.status || config.codes.HTTP.INTERNAL_ERROR;
        res.status(err.status);
        error.setDevelopment(true);
        error.setError(err);
        res.json(error.print());
    });
}
else if (config.env === config.codes.ENV.PRODUCTION) {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        err.status = err.status || config.codes.HTTP.INTERNAL_ERROR;
        res.status(err.status);
        error.setDevelopment(false);
        error.setError(err);
        res.json(error.print());
    });
}

module.exports = app;
