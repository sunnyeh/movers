angular.module('myApp')

.factory('storeService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataStore = {};
    dataStore.postStore = function (_formdata,confHeader) {
        return $http({
	          method: 'post',
	          url: Global.urlBase+"store-setting",
	          headers: confHeader,
              data: _formdata
	        });
    };
     dataStore.getStore = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"store-setting",
            headers: confHeader,
          });
    };
    return dataStore;
 }]);