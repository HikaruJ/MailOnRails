(function() {
    "use strict";

    var composeService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            send: baseUrl + '/api/v1/compose'
        };

        var service = {
            send: send
        };

        return service;

        function send(body, from, subject, to) {
            var request = {
                body: body,
                from: from,
                subject: subject,
                to: to
            };

            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    data: request,
                    header: {
                        'Authorization': 'Bearer ' + oauthData.refreshToken
                    },
                    method: 'POST',
                    url: urls.send
                })
                .then(sendSuccess)
                .catch(sendFailed);

            function sendSuccess(respond) {
                return respond;
            }

            function sendFailed(error) {
                return error;
            }
        }
    };

    module.exports = composeService;
}());