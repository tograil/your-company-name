var app = angular.module('app');
'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'globalConstants', function ($http, $q, localStorageService, globalConstants) {

    var serviceBase = globalConstants.apiUrl;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName : "",
        role: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/registration', registration, { headers: {
            'Authorization': 'Bearer ' + _authentication.token
        }}).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, role: response.role });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.token = response.access_token;
            _authentication.role = response.role;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.token = undefined;

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.token = authData.token;
            _authentication.role = authData.role;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);
