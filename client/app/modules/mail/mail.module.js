(function() {
    "use strict";

    //Angular
    var angular = require('angular');
    var angularLocalStorage = require('angular-local-storage');
    var angularSummernote = require('angular-summernote');

    //Components
    var composeComponent = require('./components/compose/compose.component');
    var mailComponent = require('./mail.component');
    var inboxComponent = require('./components/inbox/inbox.component');
    var messageComponent = require('./components/inbox/message/message.component');
    var sidebarComponent = require('./components/sidebar/sidebar.component');
    var topbarComponent = require('./components/topbar/topbar.component');

    //Factory
    var mailService = require('./mail.factory');

    module.exports = angular.module('inbox', [
            angularLocalStorage.name,
            angularSummernote.name
        ])
        .component('mail', mailComponent)
        .component('mailCompose', composeComponent)
        .component('mailInbox', inboxComponent)
        .component('mailMessage', messageComponent)
        .component('mailSidebar', sidebarComponent)
        .component('mailTopbar', topbarComponent)
        .factory('mailService', mailService);
}());