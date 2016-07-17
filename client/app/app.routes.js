(function() {
    "use strict";

    var appRoutes = function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                template: '<home></home>',
                abstract: true
            })

                .state('home.index', {
                    template: '<home-content></home-content>',
                    url: '/'
                })

                .state('home.login', {
                    url: '/login'
                })

                .state('home.register', {
                    template: '<register></register>',
                    url: '/register'
                })

            .state('mail', {
                template: '<mail></mail>',
                abstract: true,
            })

                .state('mail.inbox', {
                    template: '<mail-inbox></mail-inbox>',
                    url: '/inbox'
                });

        $urlRouterProvider.otherwise('/');
    };

    module.exports = appRoutes;
}());