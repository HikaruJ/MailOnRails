(function() {
    "use strict";

    var inboxComponent = {
        bindings: {},
        controller: InboxComponent,
        templateUrl: '/partials/mail/components/inbox/inbox.view.html'
    };

    function InboxComponent($scope, inboxService, localStorageService) {
        var ctrl = this;

        ctrl.viewModel = {
            messages: null
        };

        ctrl.user = localStorageService.get('user');
        inboxService.inboxData()
            .then(function(respond) {
                ctrl.viewModel.messages = respond.data.response;
            });
    }

    module.exports = inboxComponent;
}());