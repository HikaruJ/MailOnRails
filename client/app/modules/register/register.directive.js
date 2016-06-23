'use strict';

var registerDirective = function() {
  return {
    bindToController: true,
    controller: RegisterController,
    controllerAs: 'register',
    restrict: 'E',
    scope: {},
    templateUrl: '/partials/register/register.html',
    link: function(scope, elem, attrs) {
    }
  }
};

var RegisterController = function($scope, registerService) {
  var register = this;

  register.viewModel = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: ''
  };

  register.submit = function() {
    var user = register.viewModel;
    registerService.registerUser(user);
  };
};

module.exports = registerDirective;
