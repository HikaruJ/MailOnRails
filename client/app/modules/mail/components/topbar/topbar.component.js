(function() {
    "use strict";

    var topbarComponent = {
        bindings: {
            user: "<"
        },
        controller: TopbarController,
        templateUrl: '/partials/mail/components/topbar/topbar.view.html'
    };

    function TopbarController($scope, $state) {
        var ctrl = this;

        ctrl.logout = function() {
            $state.go('home.login');
        };
    }

    module.exports = topbarComponent;
}());