(function() {
    "use strict";

    var registerComponent = {
        controller: RegisterController,
        bindings: {},
        templateUrl: '/partials/register/register.view.html'
    };

    function RegisterController($scope, registerService) {
        var ctrl = this;

        ctrl.viewModel = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordValid: false,
            passwordConfirm: '',
            passwordConfirmMatch: false
        };

        ctrl.comparePasswords = function(password, passwordConfirm) {
            if (password == passwordConfirm) {
                ctrl.viewModel.passwordConfirmMatch = true;
            } else {
                ctrl.viewModel.passwordConfirmMatch = false;
            }
        };

        ctrl.submit = function() {
            var user = ctrl.viewModel;
            registerService.registerUser(user);
        };
    }

    module.exports = registerComponent;
}());