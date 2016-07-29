var app = angular.module('app');

'use strict';
app.controller('DataSettings', ['$scope', '$state', '$stateParams', 'dataService',
  function ($scope, $state, $stateParams, dataService) {



    $scope.actualVisible = true;
    $scope.planVisible = true;
    

  $scope.subject = [

  ];


   $scope.monthes = [];

    $scope.selectedItem = $scope.subject[0];
  $scope.plan = [

  ];


    $scope.actual = [
    
    ];



    $scope.planIndex = $scope.plan[0];
    $scope.actualIndex = $scope.actual[0];

  $scope.colors = ['brown', 'red', 'yellow', 'green', 'aqua', 'blue', 'ocean', 'violet', 'grey'];
  $scope.colors2 = ['brown', 'red', 'yellow', 'green', 'aqua', 'blue', 'ocean', 'violet', 'grey'];
  $scope.colorAccPlan = 'red';
  $scope.colorAccActual = 'blue';

    var colorsGraph = {
      brown: "#A41C1C",
      red: "#FF1C1C",
      yellow: "#FFFF1C",
      green: "#1CFF1C",
      aqua: "#1CFFFF",
      blue: "#5E94EB",
      ocean: "#1C1CFF",
      violet: "#A51CFF",
      grey: "#6E6E6E"
    }

  $scope.returnClass = function (colorModel) {
    return colorModel;
  }
    $scope.data = {};


    function getData(items) {
      var data = [];
      for(var i=0; i<items.length; i++)
      {
        data.push({
          index:i,
          title: items[i].title,
          data: items[i].data
        });
      }

      return data;
    }

    $scope.$parent.documentId = $stateParams.documentId;


    dataService.getDocumentPlanData($stateParams.documentId).success(function (data) {
      $scope.data = data;

      $scope.subject = [];

      for(var i=0; i<data.settingItems.length; i++)
      {
        $scope.subject.push({
          index: i,
          desc: data.settingItems[i].subject,
          plan: getData(data.settingItems[i].planDataItems),
          actual: getData(data.settingItems[i].actualDataItems)
        });
      }

      $scope.years = $scope.data.years;
      $scope.yearsGrouped = groupYears($scope.data.years);
      $scope.monthes = $scope.data.monthes;

      $scope.selectedItem = $scope.subject[0];
      $scope.changed();
      $scope.labels = returnLabels($scope.monthes, $scope.years )

      $scope.monthes = [];

      for(var i=0; i< $scope.labels.length; i++)
      {
        
      }
    });

    function returnLabels(monthes, years) {
      var labels = [];

      for (var i=0; i < monthes.length; i++)
      {
        labels.push(monthes[i] + " " + years[i]);
      }

      return labels;
    }

    $scope.years = ['2016', '2016'];
    $scope.yearsGrouped = {};
    $scope.yearsKeys = [];
    $scope.monthes = ['Jan', 'Feb'];

    function groupYears(years) {
      var grouped = {};
      var hist = {};
      $scope.yearsKeys = [];
      years.map( function (a) { if (a in hist) hist[a] ++; else
      {
        hist[a] = 1;
        $scope.yearsKeys.push(a);
      } } );

      return hist;
    }

    $scope.changed = function () {
      if($scope.selectedItem == null)
          return;

      var selectedItem = $scope.selectedItem;

      $scope.plan = selectedItem.plan;
      $scope.actual = selectedItem.actual;

      $scope.planIndex = selectedItem.plan[1];
      $scope.actualIndex = selectedItem.actual[1];

      $scope.redrawChart();
    };

    $scope.redrawChart = function () {
      $scope.series = [ $scope.planIndex.title, $scope.actualIndex.title ];
      $scope.data = [ $scope.planIndex.data, $scope.actualIndex.data ];
      $scope.grColors = [ colorsGraph[$scope.colorAccPlan],  colorsGraph[$scope.colorAccActual]];
    }

    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];
    $scope.grColors = [ colorsGraph[$scope.colorAccPlan],  colorsGraph[$scope.colorAccActual]];

}]);
