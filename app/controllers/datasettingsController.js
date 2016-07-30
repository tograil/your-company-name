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
      $scope.monthesYearsDropdown = [];
      $scope.timelineDropdown = [
        {
          title: '6 monthes',
          amount: 6,
          index: 0
        },
        {
          title: '1 years',
          amount: 12,
          index: 1
        },
        {
          title: '2 years',
          amount: 24,
          index: 2
        },
        {
          title: '3 years',
          amount: 36,
          index: 3
        },
        {
          title: '4 years',
          amount: 48,
          index: 4
        }];

      $scope.timeline = $scope.timelineDropdown[0];
      
      $scope.acceptFilter = function () {
        fillForm($scope.startPoint.index, $scope.timeline.amount);
        fillData($scope.startPoint.index, $scope.timeline.amount);
        $scope.redrawChart();
      }

      for(var i=0; i<data.settingItems.length; i++)
      {
        $scope.subject.push({
          index: i,
          desc: data.settingItems[i].subject,
          plan: getData(data.settingItems[i].planDataItems),
          actual: getData(data.settingItems[i].actualDataItems)
        });
        $scope.selectedItem = $scope.subject[0];
      }

      



      fillForm(0, 0);

      $scope.monthesYearsDropdown = [];

      for(var i=0; i< $scope.labels.length; i++)
      {
        $scope.monthesYearsDropdown.push({
          label: $scope.labels[i],
          year: $scope.years[i],
          month: $scope.monthes[i],
          index: i
        });

        $scope.startPoint = $scope.monthesYearsDropdown[0];
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

    function fillForm(startIndex, count){

      $scope.years = $scope.data.years;
      $scope.yearsGrouped = groupYears($scope.data.years);
      $scope.monthes = $scope.data.monthes;

      if(count > 0) {

        if (count >= $scope.years.length - startIndex) {
          count = $scope.years.length - startIndex;
        }

        var pos = count + startIndex;


        var yearsBase = $scope.years.slice(startIndex, pos);
        $scope.years = yearsBase;
        $scope.yearsGrouped = groupYears(yearsBase);
        $scope.monthes = $scope.data.monthes.slice(startIndex, pos);
      }

      $scope.changed();

      $scope.labels = returnLabels($scope.monthes, $scope.years);

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

    function fillData(startIndex, count) {
      var selectedItem = $scope.selectedItem;
        $scope.plan = selectedItem.plan;
        $scope.actual = selectedItem.actual;
      var filterCount = $scope.plan[0].data.length;
        
      //TODO: REFACTOR THIS
      if(count >= filterCount - startIndex)
      {
        count = count - (filterCount + startIndex);
      }

      for(var i = 0; i < $scope.plan.length; i++)
      {
        if(count != 0)
        {
          var pos = count + startIndex;

          $scope.plan[i].filteredData = $scope.plan[i].data.slice(startIndex, pos);
          $scope.actual[i].filteredData = $scope.actual[i].data.slice(startIndex, pos);
        }
        else{
           $scope.plan[i].filteredData = $scope.plan[i].data;
          $scope.actual[i].filteredData = $scope.actual[i].data;
        }
      }
    }

     

    $scope.changed = function () {
      if($scope.selectedItem == null)
          return;

      var selectedItem = $scope.selectedItem;
      var startIndex = $scope.startPoint == null ? 0 : $scope.startPoint.index;
      var amount = $scope.startPoint == null ? 0 : $scope.timeline.amount;

     fillData(startIndex, amount);

      $scope.planIndex = selectedItem.plan[1];
      $scope.actualIndex = selectedItem.actual[1];

      $scope.redrawChart();
    };

    $scope.redrawChart = function () {
      $scope.series = [ $scope.planIndex.title, $scope.actualIndex.title ];
      $scope.dataDraw = [ $scope.planIndex.filteredData, $scope.actualIndex.filteredData ];
      $scope.grColors = [ colorsGraph[$scope.colorAccPlan],  colorsGraph[$scope.colorAccActual]];
    }

    $scope.labels = [];
    $scope.series = [];
    $scope.dataDraw = [];
    
    $scope.grColors = [ colorsGraph[$scope.colorAccPlan],  colorsGraph[$scope.colorAccActual]];

}]);
