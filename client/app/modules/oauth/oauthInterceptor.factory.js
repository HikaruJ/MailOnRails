(function() {
    "use strict";

    var oauthInterceptor = function($q, localStorageService) {
        var interceptor = {
            request: function(config) {
                config.headers = config.headers || {};

                var oauthData = localStorageService.get('oauthData');
                if (oauthData) {
                    config.headers.Authorization = 'Bearer ' + oauthData.accessToken;
                }

                return config;
            }
        };

        return interceptor;
    };

    module.exports = oauthInterceptor;
}());