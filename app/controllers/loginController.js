var app = angular.module('app');

'use strict';
app.controller('loginController', ['$scope', '$state', 'authService', function ($scope, $state, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.invalid = false;

    $scope.message = "";

    $scope.login = function () {

       /* authService.login($scope.loginData).then(function (response) {
                $scope.invalid = false;
                $state.go('main.dashboard');

            },
            function (err) {
                $scope.invalid = true;
                $scope.message = err.error_description;
            });*/

        $state.go('main.dashboard');
    };

    $scope.validateError = function(){

    }

}]);
