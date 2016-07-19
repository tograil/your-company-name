var app = angular.module('app');

'use strict';
app.controller('Rent', ['$scope', '$state', 'dataService', 'globalConstants' , function ($scope, $state, dataService, globalConstants) {

    $scope.rentMsg = [];

    $scope.readRentInfo = false;

    $scope.currentRent = {};

    $scope.doctorPrescription = function (id) {
        return globalConstants.doctorPrescription[id];
    }

    dataService.getRents().success(function (data) {
        $scope.rentMsg = data;
    });

    $scope.read = function (id) {
        $scope.currentRent = $scope.rentMsg.find(function(contact) {
            return contact.id === id;
        })

        $scope.readRentInfo = true;

    }

    $scope.markAsRead = function () {
        dataService.setReadRent($scope.currentRent.id).success(function () {
            $scope.currentRent.new = false;
        });
    }

}]);
