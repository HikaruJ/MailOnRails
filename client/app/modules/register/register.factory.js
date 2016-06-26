(function() {
    "use strict";

    var registerService = function($http, $log, angularConfig) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            register: baseUrl + '/users'
        };

        var service = {
            registerUser: registerUser
        };

        return service;

        function registerUser(user) {
            return $http.post(urls.register, user)
                .then(registerUserSuccess)
                .catch(registerUserFailed);

            function registerUserSuccess(response) {
                debugger;
                return true;
            }

            function registerUserFailed(error) {
                $log.error('XHR Failed for registerUserFailed.' + error.data);
            }
        }
    };

    module.exports = registerService;
}());