module.exports = function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state("home", {
    template: "<home></home>",
    url: "/"
  });
}
