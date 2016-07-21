var app = angular.module('app');

'use strict';
app.controller('DataSettings', ['$scope', '$state', function ($scope, $state) {

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

  $scope.accumulate = {
    titlePlan: 'Accumulate Plan',
    Plan: [
      {month: '9 367'},
      {month: '28 365'},
      {month: '47 479'},
      {month: '59 622'},
      {month: '75 499'},
      {month: '123 246'},
      {month: '163 177'},
      {month: '225 025'},
      {month: '271 650'},
      {month: '365 930'},
      {month: '503 338'},
      {month: '621 474'}
    ],
    titleActual: 'Accumulate Actual',
    Actual: [
      {month: '9 367'},
      {month: '28 352'},
      {month: '47 470'},
      {month: '59 613'},
      {month: '75 491'},
      {month: '87 145'},
      {month: '117 366'},
      {month: '169 999'},
      {month: '197 712'},
      {month: '221 530'},
      {month: '293 411'},
      {month: ''}
    ]
  };

}]);
