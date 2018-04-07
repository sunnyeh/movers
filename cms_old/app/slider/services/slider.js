angular.module('myApp')

.factory('sliderService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataSlider = {};
    dataSlider.getSlider = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"slider",
            headers: confHeader
          });
    };
    dataSlider.getDetailSlider = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"slider/"+id,
            headers: confHeader
          });
    };
    dataSlider.postSlider = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"slider",
            headers: confHeader,
            data:_formdata
          });
    };
    dataSlider.deleteSlider = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"slider/"+id,
            headers: confHeader
        });
    };
    dataSlider.statusSlider = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"slider/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataSlider;
 }]);