(function() {
    "use strict";

    var mailComponent = {
        bindings: {},
        controller: MailComponent,
        templateUrl: '/partials/mail/mail.view.html'
    };

    function MailComponent($scope, $state, $stateParams, localStorageService) {
        var ctrl = this;

        if ($stateParams.user !== null && $stateParams.user !== undefined) {
            ctrl.user = $stateParams.user;
            localStorageService.set('user', ctrl.user);
        } else {
            var user = localStorageService.get('user');
            if (user === null) {
                $state.go('home.login');
            } else {
                ctrl.user = user;
            }
        }
    }

    module.exports = mailComponent;
}());