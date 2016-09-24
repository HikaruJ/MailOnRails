(function() {
    "use strict";

    var oauthInterceptor = function($q, $window, localStorageService) {
        var interceptor = {
            request: function(config) {
                config.headers = config.headers || {};

                var oauthData = localStorageService.get('oauthData');
                if (oauthData) {
                    config.headers.Authorization = 'Bearer ' + oauthData.accessToken;
                }

                return config;
            },

            responseError: function(errorResponse) {
                switch (errorResponse.status) {
                    case 401:
                        $window.location = '#/login';
                        break;

                    case 403:
                        $window.location = '#/login';
                        break;

                        // case 500:
                        //     $window.location = '/login';
                        //     break;
                }

                return $q.reject(errorResponse);
            }
        };

        return interceptor;
    };

    module.exports = oauthInterceptor;
}());