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
    var messageComponent = require('./components/message/message.component');
    var sentComponent = require('./components/sent/sent.component');
    var sidebarComponent = require('./components/sidebar/sidebar.component');
    var templateComponent = require('./components/template/template.component');
    var topbarComponent = require('./components/topbar/topbar.component');
    var trashComponent = require('./components/trash/trash.component');

    //Factory
    var composeService = require('./components/compose/compose.factory');
    var inboxService = require('./components/inbox/inbox.factory');
    var sentService = require('./components/sent/sent.factory');
    var trashService = require('./components/trash/trash.factory');

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
        .component('mailSent', sentComponent)
        .component('mailSidebar', sidebarComponent)
        .component('mailTemplate', templateComponent)
        .component('mailTopbar', topbarComponent)
        .component('mailTrash', trashComponent)
        .factory('composeService', composeService)
        .factory('inboxService', inboxService)
        .factory('sentService', sentService)
        .factory('trashService', trashService)
        .filter('html2string', html2StringFilter);
}());