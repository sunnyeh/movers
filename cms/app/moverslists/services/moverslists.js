angular.module('myApp')

.factory('moverslistService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataMoverslist = {};
    dataMoverslist.getMoverslist = function (search,confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"moverslist"+search,
            headers: confHeader
          });
    };
    dataMoverslist.getDetailMoverslist = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"moverslist/"+id,
            headers: confHeader
          });
    };
    dataMoverslist.postMoverslist = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"moverslist",
            headers: confHeader,
            data:_formdata
          });
    };
    dataMoverslist.deleteMoverslist = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"moverslist/"+id,
            headers: confHeader
        });
    };
    dataMoverslist.statusMoverslist = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"moverslist/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataMoverslist;
 }]);