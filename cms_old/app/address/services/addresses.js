angular.module('myApp')

.factory('addressService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataAddress = {};
    dataAddress.getAddress = function (search,confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"address"+search,
            headers: confHeader
          });
    };
    dataAddress.getDetailAddress = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"address/"+id,
            headers: confHeader
          });
    };
    dataAddress.postAddress = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"address",
            headers: confHeader,
            data:_formdata
          });
    };
    dataAddress.deleteAddress = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"address/"+id,
            headers: confHeader
        });
    };
    dataAddress.statusAddress = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"address/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataAddress;
 }]);