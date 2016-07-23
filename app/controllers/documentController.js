var app = angular.module('app');

'use strict';
app.controller('Document', ['$scope', '$state', 'dataService', 'globalConstants' , 
        function ($scope, $state, dataService, globalConstants) {
            $scope.documents = {};
            
            $scope.goSettings = function(params) {
                $state.go('main.documents.settings');
            }
            dataService.getDocuments().success(function (data) {
            
            $scope.documents  = data;
    });
   

}]);
