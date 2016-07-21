var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/main-dashboard")

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html'
    })
      .state('main.dashboard', {
        url: '-dashboard',
        templateUrl: 'views/dashboard.html',
        onEnter: function() {window.scrollTo(0,0);}
      })
      .state('main.documents', {
        url: '-documents',
        templateUrl: 'views/documents.html',
        onEnter: function() {window.scrollTo(0,0);}
      })
      .state('main.settings', {
        url: '-data-settings',
        templateUrl: 'views/data-settings.html',
        onEnter: function() {window.scrollTo(0,0);}
      })
      .state('main.plan', {
        url: '-data-plan',
        templateUrl: 'views/data-plan.html',
        onEnter: function() {window.scrollTo(0,0);}
      })
      .state('main.actual', {
        url: '-data-actual',
        templateUrl: 'views/data-actual.html',
        onEnter: function() {window.scrollTo(0,0);}
      })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })
});

app.run(['$state', 'authService', function($state, authService) {
  authService.fillAuthData();

  // if (authService.authentication.isAuth === true)
    $state.go('main.dashboard');
  // else
    // $state.go('login');

}]);

