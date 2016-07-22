(function(){

  'use strict';

  var controllerId = 'regCtrl';

  angular.module('app').controller(controllerId, ['$scope', formsController]);

  function formsController($scope){

    $scope.formInvalid = false;

    $scope.errorUserNameMsg = 'User Name error message';
    $scope.errorPasswordNameMsg = 'Password Name error message';
    $scope.errorRepeatPasswordMsg  = 'Repeat Password error message';

    $scope.regErrorMsg = function(){
      if (($scope.regForm.userName.$touched && $scope.regForm.userName.$invalid) ||
        ($scope.regForm.password.$touched && $scope.regForm.password.$invalid) ||
        ($scope.regForm.repeatPassword.$touched && $scope.regForm.repeatPassword.$invalid) ||
        ($scope.formInvalid && $scope.regForm.userName.$invalid) ||
        ($scope.formInvalid && $scope.regForm.password.$invalid) ||
        ($scope.formInvalid && $scope.regForm.repeatPassword.$invalid)) {return true;}
    };

    $scope.showErrorMsg = function(touched, invalid){
      if ((touched && invalid) || (invalid && $scope.formInvalid)) {return true;}
    };

    // Возращает элементу который не прошел валидацию стиль
    $scope.returnClass = function(touched, invalid, cssClass){
      if ((touched && invalid) || (invalid && $scope.formInvalid)) {return cssClass;}
    };

    // Отправляет данные, если все поля заполнены верно
    $scope.submitReg = function(){
      if ($scope.regForm.$invalid) {
        $scope.formInvalid = true;
      }
    };
  }

})();
