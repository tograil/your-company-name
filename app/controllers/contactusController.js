var app = angular.module('app');

'use strict';
app.controller('ContactUs', ['$scope', '$state', 'dataService', function ($scope, $state, dataService) {

    $scope.contactMsg = [];
    $scope.readContactInfo = false;
    $scope.currentUser = {};
    $scope.hideButtons = true;

    dataService.getContacts().success(function (data) {
        $scope.contactMsg = data;
    });

    $scope.read = function (id) {
        $scope.currentUser = $scope.contactMsg.find(function(contact) {
            return contact.id === id;
        })

        $scope.readContactInfo = true;

    }

    $scope.markAsRead = function () {
        dataService.setReadContact($scope.currentUser.id).success(function () {
            $scope.currentUser.new = false;
        });
    }

    $scope.showButtons = function () {
        $scope.hideButtons = false;
    }

}]);
