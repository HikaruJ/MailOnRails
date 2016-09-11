(function() {
    "use strict";

    var mailService = function($http, $log, angularConfig) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            send: baseUrl + '/api/v1/emails'
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

            $http.post(urls.send, request)
                .then(sendSuccess)
                .catch(sendFailed);

            function sendSuccess(respond) {

            }

            function sendFailed(error) {

            }
        }
    };

    module.exports = mailService;
}());