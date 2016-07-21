(function() {
    "use strict";

    var loginComponent = {
        controller: LoginController,
        bindings: {},
        templateUrl: '/partials/login/login.view.html'
    };

    function LoginController($scope, loginService) {
        var ctrl = this;

        ctrl.viewModel = {
            email: '',
            password: ''
        };

        ctrl.login = function() {
            loginService.loginUser(ctrl.viewModel.password, ctrl.viewModel.email)
                .then(function() {
                    debugger
                });
        };
    }

    module.exports = loginComponent;
}());