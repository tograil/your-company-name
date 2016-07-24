var app = angular.module('app');

'use strict';
app.controller('DataSettings', ['$scope', '$state', '$stateParams', 'dataService',
  function ($scope, $state, $stateParams, dataService) {




  $scope.subject = [
    {desc: '01 - GENERAL MOBILIZATION & DEMOBILIZATION - Structure ‏1'},
    {desc: '02 - CHAPTER 01 - Main Breakwater Extension - MBE'},
    {desc: '03 - CHAPTER 02 - Lee Revetment - LR (0-1032) '},
    {desc: '04 - CHAPTER 03 - East Revetment (Rubble Mound) - ER ®'},
    {desc: '05 - CHAPTER 04 - East Revetment (Caisson) and East Breakwater - ER (C) & EBW'},
    {desc: '06 - CHAPTER 05 - Kishon Breakwater - KBW'},
    {desc: '07 - CHAPTER 06 - Navigation Aids'},
    {desc: '08 - CHAPTER 01 - Quay 6 -800m'},
    {desc: '09 - CHAPTER 02 - Quay 7 -450m'},
    {desc: '10 - CHAPTER 03 - Quay 8 -720m'},
    {desc: '‎11 - DREDGING, RECLAMATION - Structure ‏5'},
    {desc: '12 - AREA DEVELOPMENT ‏- Structure ‏6'},
    {desc: '‎13 - DAY WORK & STAND BY - Structure ‏7'},
    {desc: '14 - TOTAL By Months'}
  ];

    $scope.selectedItem = $scope.subject[0];
  $scope.plan = [
    {
      title: 'Plan',
      data: [ '9 367' , '28 365' , '47 479', '59 622', '75 499', '123 246', '163 177', '225 025', '271 650', '365 930', '503 338', '621 474' ],
      index: 0
    } ,
    {
      title: 'AccumulatedPlan',
      data: [ '9 367' , '28 365ss' , '47 479sss', '59 622', '75 499', '123 246', '163 177', '225 025', '271 650', '365 930', '503 338', '621 474' ],
      index: 1

    }
  ];


    $scope.actual = [
      {
        title: 'Plan',
        data: [ '9 367' , '28 365' , '47 479', '59 622', '75 499', '123 246', '163 177', '225 025', '271 650', '365 930', '503 338', '621 474' ],
        index: 0,
      } ,
      {
        title: 'AccumulatedPlan',
        data: [ '9 367' , '28 365ss' , '47 479sss', '59 622', '75 499', '123 246', '163 177', '225 025', '271 650', '365 930', '503 338', '621 474' ],
        index: 1
      }
    ];

    $scope.planIndex = $scope.plan[0];
    $scope.actualIndex = $scope.actual[0];

  $scope.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink'];
  $scope.colorAccPlan = 'red';
  $scope.colorAccActual = 'orange';

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

      $scope.labels = returnLabels($scope.monthes, $scope.years )
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

      redrawChart(selectedItem.plan, selectedItem.actual);
    };

    function redrawChart(plan, actual) {
      $scope.series = [ plan.title, actual.title ];
      $scope.data = [ plan.data, actual.data ];
    }

    $scope.redrawChart = function () {
      $scope.series = [ $scope.planIndex.title, $scope.actualIndex.title ];
      $scope.data = [ $scope.planIndex.data, $scope.actualIndex.data ];
    }

    $scope.labels = [];
    $scope.series = [];
    $scope.data = [];

}]);
