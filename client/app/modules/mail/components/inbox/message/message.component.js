(function() {
    "use strict";

    var messageComponent = {
        bindings: {},
        controller: MessageController,
        templateUrl: '/partials/mail/components/inbox/message/message.view.html'
    };

    function MessageController($scope, $state, $stateParams) {
        var ctrl = this;

        if ($stateParams.user === null || $stateParams.user === undefined) {
            $state.go("home.login");
        }

        if ($stateParams.message === null || $stateParams.message === undefined) {
            $state.go("mail.inbox", {
                reload: true
            });
        }

        ctrl.viewModel = {
            message: $stateParams.message,
            user: $stateParams.user
        };

        ctrl.subjectStyle = function() {
            var message = ctrl.viewModel.message;
            if (message.is_read === false) {
                return "unread-subject";
            } else {
                return "read-subject";
            }
        };

        ctrl.senderStyle = function() {
            var message = ctrl.viewModel.message;
            if (message.is_read === false) {
                return "sender unread-sender";
            } else {
                return "sender read-sender";
            }
        };
    }

    module.exports = messageComponent;
}());