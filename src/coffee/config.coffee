angular.module('yunlamp').config ($stateProvider, $urlRouterProvider, $httpProvider) ->
  
  # routes

  $stateProvider.state 'home',
    url: '/home'
    templateUrl: 'templates/home.html'
    controller: 'HomeController'

  $urlRouterProvider.otherwise '/home'

