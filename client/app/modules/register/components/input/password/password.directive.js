(function() {
    "use strict";

    var passwordInputDirective = function() {
        return {
            bindToController: true,
            controller: PasswordInputController,
            controllerAs: 'passwordInput',
            restrict: 'E',
            scope: {
                password: '='
            },
            templateUrl: '/partials/register/components/input/password/password.view.html',
            link: function(scope, elem, attrs) {

            }
        };
    };

    var PasswordInputController = function($scope) {
        var passwordInput = this;

        var zxcvbn = require('zxcvbn');

        passwordInput.viewModel = {
            max: 4,
            password1: '',
            text: '',
            type: '',
            value: 0
        };

        passwordInput.checkPassword = function(password) {
            var passwordValid = false;

            if (password !== undefined) {
                passwordValid = true;
            }
            else {
                passwordInput.viewModel.text = '';
                passwordInput.viewModel.type = '';
                passwordInput.viewModel.value = 0;
            }

            if (passwordValid) {
                var result = zxcvbn(password);
                if (result !== null) {
                    passwordInput.viewModel.value = result.score;
                    switch (result.score) {
                        case 0:
                            passwordInput.viewModel.text = 'Simple';
                            break;

                        case 1:
                            passwordInput.viewModel.text = 'Weak';
                            passwordInput.viewModel.type = 'danger';
                            break;

                        case 2:
                            passwordInput.viewModel.text = 'Moderate';
                            passwordInput.viewModel.type = 'warning';
                            break;

                        case 3:
                            passwordInput.viewModel.text = 'Strong';
                            passwordInput.viewModel.type = 'warning';
                            break;

                        case 4:
                            passwordInput.viewModel.text = 'Perfect';
                            passwordInput.viewModel.type = 'success';
                            break;
                    }
                }
            }

        };
    };

    module.exports = passwordInputDirective;
}());