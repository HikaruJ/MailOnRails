(function() {
    "use strict";

    //Angular
    var angular = require('angular');
    var angularLocalStorage = require('angular-local-storage');
    var angularSanitize = require('angular-sanitize');
    var angularSummernote = require('angular-summernote');

    //Components
    var composeComponent = require('./components/compose/compose.component');
    var mailComponent = require('./mail.component');
    var inboxComponent = require('./components/inbox/inbox.component');
    var messageComponent = require('./components/inbox/message/message.component');
    var sidebarComponent = require('./components/sidebar/sidebar.component');
    var topbarComponent = require('./components/topbar/topbar.component');

    //Factory
    var composeService = require('./components/compose/compose.factory');
    var inboxService = require('./components/inbox/inbox.factory');

    //Filters
    var html2StringFilter = require('./components/filters/html2string.filter');

    module.exports = angular.module('inbox', [
            angularLocalStorage.name,
            angularSanitize.name,
            angularSummernote.name
        ])
        .component('mail', mailComponent)
        .component('mailCompose', composeComponent)
        .component('mailInbox', inboxComponent)
        .component('mailMessage', messageComponent)
        .component('mailSidebar', sidebarComponent)
        .component('mailTopbar', topbarComponent)
        .factory('composeService', composeService)
        .factory('inboxService', inboxService)
        .filter('html2string', html2StringFilter);
}());