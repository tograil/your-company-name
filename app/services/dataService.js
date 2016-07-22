var serviceId = 'dataService';
angular.module('dataServiceModule', []).factory(serviceId, ['$http', 'globalConstants', 'authService', dataService]);

function dataService($http, globalConstants, authService) {

    // Change with appropriate url
    var urlBase = globalConstants.apiUrl;

    var service = {
        getMachines: getMachines,
        getContacts: getContacts,
        getDashboard: getDashboard,
        postContact : postContact,
        postRent: postRent,
        setReadContact: setReadContact,
        getRents: getRents,
        setReadRent: setReadRent
    };

    return service;

    function getMachines() {
        var subUrl = 'api/Machines';
        return $http.get(urlBase + subUrl);
        
    }

    function getMachine(id) {
        var subUrl = 'api/Machines/';
        return $http.get(urlBase + subUrl + id);
    }

    function getRents() {
        var subUrl = 'api/Machines/rents';
        return $http.get(urlBase + subUrl);
    }

    function setReadRent(id) {
        var subUrl = 'api/customer/seen/';
        return $http.get(urlBase + subUrl + id);
    }

    function getContacts() {
        var subUrl = 'api/customer/'
        return $http.get(urlBase + subUrl);
    }

    function setReadContact(id) {
        var subUrl = 'api/customer/seen/';
        return $http.get(urlBase + subUrl + id);
    }

    function getDashboard() {
        debugger;
        var subUrl = 'api/dashboard/';
        return $http.get(urlBase + subUrl, {headers: {
                'Authorization': 'Bearer ' + authService.authentication.token
            }});
    }
    function postContact(data) {
        var subUrl = 'api/customer/';
        return post(urlBase + subUrl, data);
    }

    function postRent(data) {
        var subUrl = 'api/customer/rent';
        return post(urlBase + subUrl, data);
    }

    function post(url, data) {
        data.landingId = globalConstants.landingId;
        return post(url, data);
    }
}
