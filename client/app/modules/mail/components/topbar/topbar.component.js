(function() {
    "use strict";

    var topbarComponent = {
        bindings: {
            user: "<"
        },
        controller: TopbarController,
        templateUrl: '/partials/mail/components/topbar/topbar.view.html'
    };

    function TopbarController($scope, $state, localStorageService) {
        var ctrl = this;

        ctrl.logout = function() {
            localStorageService.remove('user');
            localStorageService.remove('oauthData');
            $state.go('home.login');
        };
    }

    module.exports = topbarComponent;
}());