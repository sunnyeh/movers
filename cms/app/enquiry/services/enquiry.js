angular.module('myApp')

.factory('enquiryService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataEnquiry = {};
    dataEnquiry.getEnquiry = function (search,confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"contact"+search,
            headers: confHeader
          });
    };
    dataEnquiry.getDetailEnquiry = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"contact/"+id,
            headers: confHeader
          });
    };
    dataEnquiry.postEnquiry = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"contact",
            headers: confHeader,
            data:_formdata
          });
    };
    dataEnquiry.statusEnquiry = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"contact/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataEnquiry;
 }]);