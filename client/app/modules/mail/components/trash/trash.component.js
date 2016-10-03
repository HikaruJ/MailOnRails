(function() {
    "use strict";

    var trashComponent = {
        bindings: {},
        controller: TrashComponent,
        templateUrl: '/partials/mail/components/trash/trash.view.html'
    };

    function TrashComponent($scope, $state, localStorageService, trashService) {
        var ctrl = this;

        ctrl.viewModel = {
            message: null,
            messages: null
        };

        ctrl.user = localStorageService.get('user');

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
            $state.go('mail.trash.message', {
                displayId: message.displayId,
                message: message,
                returnRoute: 'mail.trash.index',
                user: ctrl.user
            });
        };

        trashService.trashData()
            .then(function(respond) {
                ctrl.viewModel.messages = respond.data.messages;
            });
    }

    module.exports = trashComponent;
}());