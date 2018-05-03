var codes = {};

codes.HTTP = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};

codes.SERVICES = {
    SUCCESS: 1,
    FAILED: 2
};

codes.ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};

module.exports = codes;