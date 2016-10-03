(function() {
    "use strict";

    var messageComponent = {
        bindings: {},
        controller: MessageController,
        templateUrl: '/partials/mail/components/message/message.view.html'
    };

    function MessageController($scope, $state, $stateParams, inboxService, modalService, sentService, trashService) {
        var ctrl = this;

        var returnRoute = $stateParams.returnRoute;
        if (returnRoute === null || returnRoute === undefined) {
            returnRoute = 'mail.inbox.index';
        }

        if ($stateParams.user === null || $stateParams.user === undefined) {
            $state.go('home.login');
        }

        if ($stateParams.message === null || $stateParams.message === undefined) {
            $state.go(returnRoute, {
                reload: true
            });
        }

        ctrl.viewModel = {
            message: $stateParams.message,
            returnRoute: returnRoute,
            user: $stateParams.user
        };

        ctrl.deleteMessage = function() {
            var message = ctrl.viewModel.message;
            switch (message.typeId) {
                case 1: //Inbox
                    inboxService.deleteMessage(message.displayId)
                        .then(function(response) {
                            $state.go(ctrl.viewModel.returnRoute);
                        });
                    break;

                case 2: //Sent
                    sentService.deleteMessage(message.displayId)
                        .then(function(response) {
                            $state.go(ctrl.viewModel.returnRoute);
                        });
                    break;

                case 4: //Trash
                    modalService.confirm('Are you sure you want this message permanently?', deleteTrashMessage, 'md');
                    break;
            }
        };

        var deleteTrashMessage = function() {
            var message = ctrl.viewModel.message;
            trashService.deleteMessage(message.displayId)
                .then(function(response) {
                    $state.go(ctrl.viewModel.returnRoute);
                });
        };

        ctrl.subjectStyle = function() {
            var message = ctrl.viewModel.message;
            if (message.isRead === false) {
                return 'unread-subject';
            } else {
                return 'read-subject';
            }
        };

        ctrl.senderStyle = function() {
            var message = ctrl.viewModel.message;
            if (message.isRead === false) {
                return 'sender unread-sender';
            } else {
                return 'sender read-sender';
            }
        };
    }

    module.exports = messageComponent;
}());