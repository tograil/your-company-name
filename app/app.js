var app = angular.module('app', ['angular-ellipses', 'ui.router', 'LocalStorageModule', 'dataServiceModule']);

app.constant('globalConstants', {
  apiUrl: "http://localhost:51925/",
  landingId: "admin",
  doctorPrescription: [ "Unsure", "Yes", "No" ]
});

app.controller('Ctrl', function($scope, $http) {

  var view = 0;

  $http.get('content/data/help-msg.json').success(function(data){$scope.helpMsg = data;});
  $http.get('content/data/machine.json').success(function(data){$scope.machineData = data;});

  $scope.pageSelection = function(pageNumber) {view = pageNumber;}
  $scope.returnActiveClass = function(pageNumber) {return (pageNumber == view) ? 'active' : '';}

});

app.run(function($rootScope, $templateCache) {
  $rootScope.$on('$viewContentLoaded', function() {
    $templateCache.removeAll();
  });
});

