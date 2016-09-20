(function() {
    "use strict";

    var inboxService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            inboxData: baseUrl + '/api/v1/emails/inbox'
        };

        var service = {
            inboxData: inboxData
        };

        return service;

        function inboxData() {
            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    header: {
                        'Authorization': 'Bearer ' + oauthData.accessToken
                    },
                    method: 'POST',
                    url: urls.inboxData
                })
                .then(inboxDataSuccess)
                .catch(inboxDataFailed);

            function inboxDataSuccess(respond) {
                angular.forEach(respond.data.response, function(message, index) {
                    var email = message.from;
                    var nickname = email.substring(0, email.lastIndexOf("@"));
                    message.nickname = nickname;
                });

                return respond;
            }

            function inboxDataFailed(error) {
                return error;
            }
        }
    };

    module.exports = inboxService;
}());