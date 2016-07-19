var app = angular.module('app');

'use strict';
app.controller('logoutController', ['$scope', '$state', 'authService', function ($scope, $state, authService) {

    $scope.message = "";

    $scope.logout = function () {
        authService.logOut();
        $state.go('login')
    };

}]);
