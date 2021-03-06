(function() {
    "use strict";

    var inboxComponent = {
        bindings: {},
        controller: InboxComponent,
        templateUrl: '/partials/mail/components/inbox/inbox.view.html'
    };

    function InboxComponent($scope, $state, inboxService, localStorageService) {
        var ctrl = this;

        ctrl.viewModel = {
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
                inboxService.readMessage(displayId, isRead)
                    .then(function(respond) {
                        message.isRead = isRead;
                        redirectToMessage(message);
                    });
            }
        };

        var redirectToMessage = function(message) {
            $state.go('mail.inbox.message', {
                displayId: message.displayId,
                message: message,
                returnRoute: 'mail.inbox.index',
                user: ctrl.user
            });
        };

        inboxService.inboxData()
            .then(function(respond) {
                ctrl.viewModel.messages = respond.data.messages;
            });
    }

    module.exports = inboxComponent;
}());