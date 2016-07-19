var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      templateUrl: 'views/main.html',
      abstract: true
    }).state('main.dashboard', {
      templateUrl: 'views/dashboard.html'
    }).state('main.documents', {
      templateUrl: 'views/documents.html'
    }).state('login', {
      templateUrl: 'views/login.html'
    })
});

app.run(['$state', 'authService', function($state, authService) {
  authService.fillAuthData();

  if (authService.authentication.isAuth === true)
    $state.go('main.dashboard');
  else
    $state.go('login');
}]);
