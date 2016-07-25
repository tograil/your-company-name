var app = angular.module('app');

'use strict';
app.controller('logoutController', ['$scope', '$state', 'authService', function ($scope, $state, authService) {

    $scope.isSuper = authService.authentication.role === "SuperUser";
    
    $scope.message = "";
    $scope.logout = function () {
        authService.logOut();
        $state.go('login')
    };
}]);
