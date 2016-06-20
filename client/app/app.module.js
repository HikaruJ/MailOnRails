'use strict';

var angular = require('angular');
var registerModule = require('./modules/register/register.module');

angular.module('mail_on_rails', [
  registerModule.name
]);
