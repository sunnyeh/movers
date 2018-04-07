angular.module('myApp')

.factory('loginService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataLogin = {};
    dataLogin.postLogin = function (_formdata,confHeader) {
        return $http({
	          method: 'post',
	          url: Global.urlBase+"auth/login",
	          headers: confHeader,
              data: _formdata
	        });
    };
    return dataLogin;
 }]);