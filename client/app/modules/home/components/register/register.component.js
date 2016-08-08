(function() {
    "use strict";

    var registerComponent = {
        controller: RegisterController,
        bindings: {},
        templateUrl: '/partials/home/components/register/register.view.html'
    };

    function RegisterController($loading, $scope, $state, modalService, registerService) {
        var ctrl = this;

        ctrl.viewModel = {
            disableInput: false,
            firstName: '',
            lastName: '',
            password: '',
            passwordValid: false,
            passwordConfirm: '',
            passwordConfirmMatch: false,
            username: ''
        };

        ctrl.comparePasswords = function(password, passwordConfirm) {
            if (password == passwordConfirm) {
                ctrl.viewModel.passwordConfirmMatch = true;
            } else {
                ctrl.viewModel.passwordConfirmMatch = false;
            }
        };

        ctrl.emailExists = function(username) {
            if (username !== undefined && username !== null && username !== '') {
                $loading.start('progress');
                ctrl.viewModel.disableInput = true;

                var request = {
                    username: username
                };

                registerService.emailExists(request)
                    .then(function(data) {
                        if (data.status != 200) {
                            modalService.alert(data.response, 'md');
                        }

                        ctrl.viewModel.disableInput = false;
                        $loading.finish('progress');
                    });
            }
        };

        ctrl.submit = function() {
            $loading.start('progress');
            ctrl.viewModel.disableInput = true;

            var request = {
                first_name: ctrl.viewModel.firstName,
                last_name: ctrl.viewModel.lastName,
                password: ctrl.viewModel.password,
                password_confirmation: ctrl.viewModel.passwordConfirm,
                username: ctrl.viewModel.username
            };

            registerService.registerUser(request)
                .then(function(data) {
                    if (data.status == 201) {
                        $state.go('mail.inbox')
                    } else {
                        modalService.alert(data.response, 'md');
                    }

                    $loading.finish('progress');
                    ctrl.viewModel.disableInput = false;
                });
        };
    }

    module.exports = registerComponent;
}());