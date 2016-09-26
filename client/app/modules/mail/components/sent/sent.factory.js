(function() {
    "use strict";

    var sentService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;
        var unreadMessages = 0;

        var urls = {
            deleteMessage: baseUrl + '/api/v1/sent',
            sentData: baseUrl + '/api/v1/sent',
            readMessage: baseUrl + '/api/v1/sent'
        };

        var service = {
            deleteMessage: deleteMessage,
            sentData: sentData,
            readMessage: readMessage,
            unreadMessages: unreadMessages
        };

        return service;

        function deleteMessage(id) {
            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    header: {
                        'Authorization': 'Bearer ' + oauthData.accessToken
                    },
                    method: 'DELETE',
                    url: urls.deleteMessage + '/' + id
                })
                .then(deleteMessageSuccess)
                .catch(deleteMessageFailed);

            function deleteMessageSuccess(respond) {
                return respond;
            }

            function deleteMessageFailed(error) {
                return error;
            }
        }

        function sentData() {
            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    header: {
                        'Authorization': 'Bearer ' + oauthData.accessToken
                    },
                    method: 'GET',
                    url: urls.sentData
                })
                .then(sentDataSuccess)
                .catch(sentDataFailed);

            function sentDataSuccess(respond) {
                var unreadMessagesCount = 0;

                angular.forEach(respond.data.messages, function(message, index) {
                    var email = message.from;
                    var nickname = email.substring(0, email.lastIndexOf("@"));
                    message.nickname = nickname;

                    if (message.isRead === false) {
                        unreadMessagesCount = unreadMessagesCount + 1;
                    }
                });

                unreadMessages = unreadMessagesCount;
                service.unreadMessages = unreadMessages;

                return respond;
            }

            function sentDataFailed(error) {
                return error;
            }
        }

        function readMessage(id, isRead) {
            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    data: {
                        id: id,
                        is_read: isRead
                    },
                    header: {
                        'Authorization': 'Bearer ' + oauthData.accessToken
                    },
                    method: 'POST',
                    url: urls.readMessage
                })
                .then(readMessageSuccess)
                .catch(readMessageFailed);

            function readMessageSuccess(respond) {
                if (unreadMessages !== 0) {
                    unreadMessages = unreadMessages - 1;
                }

                service.unreadMessages = unreadMessages;

                return respond;
            }

            function readMessageFailed(error) {
                return error;
            }
        }
    };

    module.exports = sentService;
}());