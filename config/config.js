var extend = require('util')._extend;

var development = require('./env/development');
var production = require('./env/production');

var codes = require('./codes');
var routes = require('./routes');

var config = {
    development: extend(development, {routes: routes, codes: codes}),
    production: extend(production, {routes: routes, codes: codes})
}[process.env.NODE_ENV || 'development'];

module.exports = config;