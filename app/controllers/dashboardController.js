var app = angular.module('app');

'use strict';
app.controller('Dashboard', ['$scope', '$state', 'dataService', 'globalConstants' , function ($scope, $state, dataService, globalConstants) {

    $scope.readContactInfo = false;
    $scope.isUploadAvailable = false;

    
    dataService.getDashboard().success(function (data) {
        debugger;
        $scope.isUploadAvailable = data.isUploadAvailable;
    });

    

}]);
