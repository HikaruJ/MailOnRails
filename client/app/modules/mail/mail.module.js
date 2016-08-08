(function() {
    "use strict";

    //Angular
    var angular = require('angular');
    var angularLocalStorage = require('angular-local-storage');

    //Components
    var mailComponent = require('./mail.component');
    var inboxComponent = require('./components/inbox/inbox.component');
    var messageComponent = require('./components/message/message.component');
    var sidebarComponent = require('./components/sidebar/sidebar.component');
    var topbarComponent = require('./components/topbar/topbar.component');

    module.exports = angular.module('inbox', [
            angularLocalStorage.name
        ])
        .component('mail', mailComponent)
        .component('mailInbox', inboxComponent)
        .component('mailMessage', messageComponent)
        .component('mailSidebar', sidebarComponent)
        .component('mailTopbar', topbarComponent);
}());