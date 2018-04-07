angular.module('myApp')

.factory('profileService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataProfile = {};
    dataProfile.getProfile = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"profile",
            headers: confHeader
          });
    };
    dataProfile.postProfile = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"profile",
            headers: confHeader,
            data:_formdata
          });
    };
    return dataProfile;
 }]);