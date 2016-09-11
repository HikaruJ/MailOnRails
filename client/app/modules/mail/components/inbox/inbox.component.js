(function() {
    "use strict";

    var inboxComponent = {
        bindings: {},
        controller: InboxComponent,
        templateUrl: '/partials/mail/components/inbox/inbox.view.html'
    };

    function InboxComponent($scope, localStorageService) {
        var ctrl = this;

        ctrl.user = localStorageService.get('user');
    }

    module.exports = inboxComponent;
}());