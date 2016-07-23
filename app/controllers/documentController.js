var app = angular.module('app');

'use strict';
app.controller('Document', ['$scope', '$state', 'dataService', 'globalConstants' , 
        function ($scope, $state, dataService, globalConstants) {
            $scope.documents = {};
            debugger;
            dataService.getDocuments().success(function (data) {
            
            $scope.documents  = data;
    });
   

}]);
