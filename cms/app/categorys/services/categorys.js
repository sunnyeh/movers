angular.module('myApp')

.factory('categoryService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var datacategory = {};
    datacategory.getCategory = function (search,confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"category"+search,
            headers: confHeader
          });
    };
    datacategory.getCategoryDropDown = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"category-dropdown",
            headers: confHeader
          });
    };
    datacategory.getDetailCategory = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"category/"+id,
            headers: confHeader
          });
    };
    datacategory.postCategory = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"category",
            headers: confHeader,
            data:_formdata
          });
    };
    datacategory.deleteCategory = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"category/"+id,
            headers: confHeader
        });
    };
    datacategory.statusCategory = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"category/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return datacategory;
 }]);