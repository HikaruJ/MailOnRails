(function() {
    "use strict";

    var loginService = function($http, $log, angularConfig) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            login: baseUrl + '/login'
        };

        var service = {
            loginUser: loginUser
        };

        return service;

        function loginUser(password, user) {
            var credentials = {
                password: password,
                user: user
            };

            return $http.post(urls.login, credentials)
                .then(loginUserSuccess)
                .catch(loginUserFailed);

            function loginUserSuccess(response) {
                return true;
            }

            function loginUserFailed(error) {
                $log.error('XHR Failed for loginUserFailed.' + error.data);
            }
        }
    };

    module.exports = loginService;
}());