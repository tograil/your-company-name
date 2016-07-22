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
        .state('main.documents.list', {
          url: '-list',
          templateUrl: 'views/list.html',
          onEnter: function() {window.scrollTo(0,0);}
        })
        .state('main.documents.settings', {
          url: '-settings',
          templateUrl: 'views/data-settings.html',
          onEnter: function() {window.scrollTo(0,0);}
        })
        .state('main.documents.plan', {
          url: '-plan',
          templateUrl: 'views/data-plan.html',
          onEnter: function() {window.scrollTo(0,0);}
        })
        .state('main.documents.actual', {
          url: '-actual',
          templateUrl: 'views/data-actual.html',
          onEnter: function() {window.scrollTo(0,0);}
        })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })
    .state('registration', {
      url: '/registration',
      templateUrl: 'views/registration.html'
    })
});

app.run(['$state', 'authService', function($state, authService) {
  authService.fillAuthData();

  // if (authService.authentication.isAuth === true)
    $state.go('main.dashboard');
  // else
    // $state.go('login');

}]);

