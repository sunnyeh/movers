angular.module('myApp')

.factory('servicesService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataService = {};
    dataService.getService = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"service",
            headers: confHeader
          });
    };
    dataService.getDetailService = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"service/"+id,
            headers: confHeader
          });
    };
    dataService.postService = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"service",
            headers: confHeader,
            data:_formdata
          });
    };
    dataService.deleteService = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"service/"+id,
            headers: confHeader
        });
    };
    dataService.statusService = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"service/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataService;
 }]);