(function() {
    "use strict";

    var inboxComponent = {
        bindings: {
            user: "="
        },
        controller: InboxComponent,
        templateUrl: '/partials/mail/components/inbox/inbox.view.html'
    };

    function InboxComponent($scope) {
        var ctrl = this;
    }

    module.exports = inboxComponent;
}());