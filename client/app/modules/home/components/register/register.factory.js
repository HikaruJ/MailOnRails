(function() {
    "use strict";

    var registerService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            emailExists: baseUrl + '/users/email_exists',
            register: baseUrl + '/users'
        };

        var service = {
            emailExists: emailExists,
            registerUser: registerUser
        };

        return service;

        function emailExists(request) {
            return $http.post(urls.emailExists, request)
                .then(emailExistsSuccess)
                .catch(emailExistsFailed);

            function emailExistsSuccess(respond) {
                var result = {
                    response: null,
                    status: null
                };

                if (respond === null || respond.data === null) {
                    return result;
                }

                var data = respond.data.user;
                result.response = data;
                result.status = respond.status;
                return result;
            }

            function emailExistsFailed(error) {
                var result = {
                    response: null,
                    status: null
                };

                if (error === null || error.data === null) {
                    return result;
                }

                var data = error.data;
                result.response = data.response;
                result.status = error.status;
                return result;
            }
        }

        function registerUser(request) {
            return $http.post(urls.register, request)
                .then(registerUserSuccess)
                .catch(registerUserFailed);

            function registerUserSuccess(respond) {
                var result = {
                    response: null,
                    status: null
                };

                if (respond === null || respond.data === null) {
                    return result;
                }

                var user = respond.data.user;
                var token = user.token;
                localStorageService.set('oauthData', {
                    accessToken: token.token,
                    refreshToken: token.refresh_token
                });

                result.response = user;
                result.status = respond.status;
                return result;
            }

            function registerUserFailed(error) {
                var result = {
                    response: null,
                    status: null
                };

                if (error === null || error.data === null) {
                    return result;
                }

                var data = error.data;
                result.response = data.response;
                result.status = error.status;
                return result;
            }
        }
    };

    module.exports = registerService;
}());