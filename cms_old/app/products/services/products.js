angular.module('myApp')

.factory('productService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataproduct = {};
    dataproduct.getProduct = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"product",
            headers: confHeader
          });
    };
    dataproduct.getDetailProduct = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"product/"+id,
            headers: confHeader
          });
    };
    dataproduct.postProduct = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"product",
            headers: confHeader,
            data:_formdata
          });
    };
    dataproduct.deleteProduct = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"product/"+id,
            headers: confHeader
        });
    };
    dataproduct.statusProduct = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"product/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataproduct;
 }]);