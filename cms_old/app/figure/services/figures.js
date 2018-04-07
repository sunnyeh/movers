angular.module('myApp')

.factory('figureService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope, Global) {
   	var dataFigure = {};
    dataFigure.getFigure = function (confHeader) {
        return $http({
            method: 'get',
            url: Global.urlBase+"figure",
            headers: confHeader
          });
    };
    dataFigure.getDetailFigure = function (confHeader,id) {
        return $http({
            method: 'get',
            url: Global.urlBase+"figure/"+id,
            headers: confHeader
          });
    };
    dataFigure.postFigure = function (_formdata,confHeader) {
        return $http({
            method: 'post',
            url: Global.urlBase+"figure",
            headers: confHeader,
            data:_formdata
          });
    };
    dataFigure.deleteFigure = function (confHeader,id) {
        return $http({
            method: 'delete',
            url: Global.urlBase+"figure/"+id,
            headers: confHeader
        });
    };
    dataFigure.statusFigure = function (confHeader,id,status) {
        return $http({
            method: 'get',
            url: Global.urlBase+"figure/"+id+"/status/"+status,
            headers: confHeader
        });
    };
    return dataFigure;
 }]);