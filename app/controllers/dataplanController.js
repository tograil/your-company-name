var app = angular.module('app');

'use strict';
app.controller('DataPlan', ['$scope', '$state', function ($scope, $state) {


  $scope.title1 = 'Plan';
  $scope.title2 = 'Accumulated Plan';
  $scope.title3 = 'Supervisoer Comments';

  $scope.month = [
    {m: 'Jan.'},
    {m: 'Feb.'},
    {m: 'Mar.'},
    {m: 'Apr.'},
    {m: 'May.'},
    {m: 'Jun.'},
    {m: 'Jul.'},
    {m: 'Aug.'},
    {m: 'Sep.'},
    {m: 'Oct.'},
    {m: 'Nov.'},
    {m: 'Dec.'}
  ];

}]);
