angular.module('myApp')

.factory('testimonyService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataTestimony = {};
    dataTestimony.getTestimony = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"testimony",
            headers: confHeader
          });
    };
    dataTestimony.getDetailTestimony = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"testimony/"+id,
            headers: confHeader
          });
    };
    dataTestimony.postTestimony = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"testimony",
            headers: confHeader,
            data:_formdata
          });
    };
    dataTestimony.deleteTestimony = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"testimony/"+id,
            headers: confHeader
        });
    };
    dataTestimony.statusTestimony = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"testimony/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataTestimony;
 }]);