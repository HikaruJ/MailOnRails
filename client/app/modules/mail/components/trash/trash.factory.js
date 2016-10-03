(function() {
    "use strict";

    var trashService = function($http, $log, angularConfig, localStorageService) {
        var baseUrl = angularConfig.baseUrl;
        var messagesCount = 0;

        var urls = {
            deleteMessage: baseUrl + '/api/v1/trash',
            readMessage: baseUrl + '/api/v1/trash',
            trashData: baseUrl + '/api/v1/trash'
        };

        var service = {
            deleteMessage: deleteMessage,
            messagesCount: messagesCount,
            readMessage: readMessage,
            trashData: trashData
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
                return respond;
            }

            function readMessageFailed(error) {
                return error;
            }
        }

        function trashData() {
            var oauthData = localStorageService.get('oauthData');
            if (oauthData === null) {
                return null;
            }

            return $http({
                    header: {
                        'Authorization': 'Bearer ' + oauthData.accessToken
                    },
                    method: 'GET',
                    url: urls.trashData
                })
                .then(trashDataSuccess)
                .catch(trashDataFailed);

            function trashDataSuccess(respond) {
                angular.forEach(respond.data.messages, function(message, index) {
                    var email = message.from;
                    var nickname = email.substring(0, email.lastIndexOf("@"));
                    message.nickname = nickname;
                });

                messagesCount = respond.data.messages.length;
                service.messagesCount = messagesCount;

                return respond;
            }

            function trashDataFailed(error) {
                return error;
            }
        }
    };

    module.exports = trashService;
}());