var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'views/main.html'
    })
      .state('main.dashboard', {
        url: '-dashboard',
        templateUrl: 'views/dashboard.html'
      })
      .state('main.documents', {
        url: '-documents',
        templateUrl: 'views/documents.html'
      })
      .state('main.settings', {
        url: '-data-settings',
        templateUrl: '../views/data-settings.html'
      })
      .state('main.plan', {
        url: '-data-plan',
        templateUrl: '../views/data-plan.html'
      })
      .state('main.actual', {
        url: '-data-actual',
        templateUrl: '../views/data-actual.html'
      })
    .state('login', {
      url: '',
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
