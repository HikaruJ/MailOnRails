(function() {
    "use strict";

    var sentComponent = {
        bindings: {},
        controller: InboxComponent,
        templateUrl: '/partials/mail/components/sent/sent.view.html'
    };

    function InboxComponent($scope, $state, localStorageService, sentService) {
        var ctrl = this;

        ctrl.viewModel = {
            message: null,
            messages: null
        };

        ctrl.user = localStorageService.get('user');

        ctrl.subjectStyle = function(message) {
            if (message.isRead === false) {
                return "unread-subject";
            } else {
                return "read-subject";
            }
        };

        ctrl.senderStyle = function(message) {
            if (message.isRead === false) {
                return "unread-sender";
            } else {
                return "read-sender";
            }
        };

        ctrl.openMessage = function(message) {
            var displayId = message.displayId;

            if (message.isRead === true) {
                redirectToMessage(message);
            } else {
                var isRead = true;
                sentService.readMessage(displayId, isRead)
                    .then(function(respond) {
                        message.isRead = isRead;

                        redirectToMessage(message);
                    });
            }
        };

        var redirectToMessage = function(message) {
            $state.go('mail.sent.message', {
                displayId: message.displayId,
                message: message,
                returnRoute: 'mail.sent.index',
                user: ctrl.user
            });
        };

        sentService.sentData()
            .then(function(respond) {
                ctrl.viewModel.messages = respond.data.messages;
            });
    }

    module.exports = sentComponent;
}());