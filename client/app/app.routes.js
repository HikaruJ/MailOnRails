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

      .state('home.register', {
        template: '<register></register>',
        url: '/register'
      });

    $urlRouterProvider.otherwise('/');
}

module.exports = appRoutes;
