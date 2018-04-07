angular.module('myApp')

.factory('aboutService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataAbout = {};
    dataAbout.getAbout = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"about",
            headers: confHeader
          });
    };
    dataAbout.postAbout = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"about",
            headers: confHeader,
            data:_formdata
          });
    };
    return dataAbout;
 }]);