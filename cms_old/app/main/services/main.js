angular.module('myApp')

.factory('mainService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataMain = {};
    dataMain.getLogout = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"logout",
            headers: confHeader
          });
    };
    dataMain.getCheckToken = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"check-token",
            headers: confHeader
          });
    };
    dataMain.ChangePassword = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"change-password",
            headers: confHeader,
            data:_formdata
          });
    };
    return dataMain;
 }]);