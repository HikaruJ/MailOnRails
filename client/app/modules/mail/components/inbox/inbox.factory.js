(function() {
    "use strict";

    var inboxService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;

        var urls = {
            inboxData: baseUrl + '/api/v1/inbox',
            readMessage: baseUrl + '/api/v1/inbox'
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
                    method: 'GET',
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

        function readMessage(id) {
            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    data: id,
                    header: {
                        'Authorization': 'Bearer ' + oauthData.accessToken
                    },
                    method: 'POST',
                    url: urls.markRead
                })
                .then(readMessageSuccess)
                .catch(readMessageFailed);

            function readMessageSuccess(respond) {
                return respond;
            }

            function readMessageFailed(error) {
                return error;
            }
        }
    };

    module.exports = inboxService;
}());