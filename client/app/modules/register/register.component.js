(function() {
    "use strict";

    var registerComponent = {
        controller: RegisterController,
        bindings: {},
        templateUrl: '/partials/register/register.view.html'
    };

    function RegisterController($scope, $state, modalService, registerService) {
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

        ctrl.emailExists = function(email) {
            var request = {
                email: email
            };

            registerService.emailExists(request)
                .then(function(data) {
                    if (data.status != 200) {
                        modalService.alert(data.response, 'md');
                    }
                });
        };

        ctrl.submit = function() {
            var request = {
                email: ctrl.viewModel.email,
                first_name: ctrl.viewModel.firstName,
                last_name: ctrl.viewModel.lastName,
                password: ctrl.viewModel.password,
                password_confirmation: ctrl.viewModel.passwordConfirm
            };

            registerService.registerUser(request)
                .then(function(data) {
                    if (data.status == 201) {
                        $state.go('mail.inbox', {
                            user: data.response
                        });
                    } else {
                        modalService.alert(data.response, 'md');
                    }
                });
        };
    }

    module.exports = registerComponent;
}());