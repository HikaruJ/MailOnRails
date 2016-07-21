(function() {
    "use strict";

    var authService = function($q) {
        var interceptor = {
            request: function(config) {
                // config.headers.authorization = 'abcd';

                return config;
            }
        };

        return interceptor;
    };

    module.exports = authService;
}());