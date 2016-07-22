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
.controller('Dashboard', ['$scope', '$state', '$http', 'globalConstants','dataService', function ($scope, $state, $http, globalConstants, dataService) {

    $scope.readContactInfo = false;
    $scope.isUploadAvailable = false;


    dataService.getDashboard().success(function (data) {
        debugger;
        $scope.isUploadAvailable = data.isUploadAvailable;
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
                    url: globalConstants.apiUrl +'/api/FileUpload/',
                    data: formdata,
                    headers: {
                        'Content-Type': undefined
                    }
                };

                $http(request)
                    .success(function (d) {
                        alert(d);
                    })
                    .error(function () {
                    });
            };
}]);
