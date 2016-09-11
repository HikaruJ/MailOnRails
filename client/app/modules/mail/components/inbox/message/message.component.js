(function() {
    "use strict";

    var messageComponent = {
        bindings: {
            user: "="
        },
        controller: MessageController,
        templateUrl: '/partials/mail/components/inbox/message/message.view.html'
    };

    function MessageController($scope) {

    }

    module.exports = messageComponent;
}());