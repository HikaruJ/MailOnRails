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
            var user = {
                email: ctrl.viewModel.email,
                first_name: ctrl.viewModel.firstName,
                last_name: ctrl.viewModel.lastName,
                password: ctrl.viewModel.password,
                password_confirmation: ctrl.viewModel.passwordConfirm
            };

            registerService.registerUser(user)
                .then(function(resp) {
                    debugger
                });
        };
    }

    module.exports = registerComponent;
}());