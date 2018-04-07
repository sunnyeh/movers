angular.module('myApp')

.factory('socialmediaService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataSocialmedia = {};
    dataSocialmedia.getSocialmedia = function (search,confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"social-media"+search,
            headers: confHeader
          });
    };
    dataSocialmedia.getDetailSocialmedia = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"social-media/"+id,
            headers: confHeader
          });
    };
    dataSocialmedia.postSocialmedia = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"social-media",
            headers: confHeader,
            data:_formdata
          });
    };
    dataSocialmedia.deleteSocialmedia = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"social-media/"+id,
            headers: confHeader
        });
    };
    dataSocialmedia.statusSocialmedia = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"social-media/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataSocialmedia;
 }]);