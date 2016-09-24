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
            message: null,
            messages: null
        };

        ctrl.user = localStorageService.get('user');

        ctrl.subjectStyle = function(message) {
            if (message.is_read === false) {
                return "unread-subject";
            } else {
                return "read-subject";
            }
        };

        ctrl.senderStyle = function(message) {
            if (message.is_read === false) {
                return "unread-sender";
            } else {
                return "read-sender";
            }
        };

        ctrl.openMessage = function(message) {
            $state.go('mail.message', {
                displayId: message.displayId,
                message: message,
                user: ctrl.user
            });
        };

        inboxService.inboxData()
            .then(function(respond) {
                ctrl.viewModel.messages = respond.data.response;
            });
    }

    module.exports = inboxComponent;
}());