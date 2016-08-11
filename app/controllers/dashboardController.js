var app = angular.module('app');

'use strict';
app.directive('ngFiles', ['$parse', function ($parse) {

            function fn_link(scope, element, attrs) {
                var onChange = $parse(attrs.ngFiles);
                element.on('change', function (event) {
                    onChange(scope, { $files: event.target.files });
                });
            };

            return {
                link: fn_link
            }
        } ])
.controller('Dashboard', ['$scope', '$state', '$http', 'globalConstants','dataService', 'authService', 
function ($scope, $state, $http, globalConstants, dataService, authService) {

    $scope.readContactInfo = false;
    $scope.isUploadAvailable = false;
    $scope.users = [];
    $scope.userName = "";

    $scope.fileUploadSuccess = false;
    $scope.fileUploadMessage = "";

    function reloadDocuments() {
        dataService.getDocuments().success(function (data) {
            $scope.documents = data;
        });
    }

    reloadDocuments();

    dataService.getDashboard().success(function (data) {
        if(!authService.authentication.isAuth)
			$state.go('login');
        $scope.isUploadAvailable = data.isUploadAvailable;
        dataService.getEndUsers().success(function (data) {
            $scope.users = data;
        });
    });

    var formdata = new FormData();
            $scope.getTheFiles = function ($files) {
                angular.forEach($files, function (value, key) {
                    formdata.append(key, value);
                });
            };

            $scope.uploadFiles = function () {
                
                var request = {
                    method: 'POST',
                    url: globalConstants.apiUrl +'api/FileUpload/',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'Bearer ' + authService.authentication.token
                    }
                };

                $http(request)
                    .success(function (d) {
                        $scope.fileUploadMessage = d;
                        $scope.fileUploadSuccess = true;
                        reloadDocuments();
                    })
                    .error(function () {
                    });
            };
}]);
