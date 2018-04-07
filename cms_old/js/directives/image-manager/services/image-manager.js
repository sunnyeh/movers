angular.module('myApp')

.factory('imageService', ['$http', '$location', '$rootScope', 'Global', function($http, $location, $rootScope,Global) {
   	var dataImage = {};
   	dataImage.getFile = function (path,confHeader) {
        return $http({
    	       method: 'get',
    	       url: Global.urlBase+"image-manager?folederPath="+path,
    	       headers: confHeader
	        });
    };
    dataImage.createDirectory = function (path,formData,confHeader) {
        return $http({
                method: 'post',
                url: Global.urlBase+"image-manager/make-directory?path="+path,
                data: formData,
                headers: confHeader
            });
    };
    dataImage.deleteFileDirectory = function (path,formData,confHeader) {
        return $http({
                method: 'post',
                url: Global.urlBase+"image-manager/delete-file-directory?path="+path,
                data: formData,
                headers: confHeader
            });
    };
    dataImage.uploadFile = function (path,formData,confHeader) {
        return $http({
                method: 'post',
                url: Global.urlBase+"image-manager/upload-image?path="+path,
                data: formData,
                headers: confHeader
            });
    };
    return dataImage;
 }]);