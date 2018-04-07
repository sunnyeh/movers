angular.module('myApp')

.factory('Global', ['$http', '$location', '$rootScope', function($http, $location, $rootScope) {
   	return {
    	urlBase: $location.protocol()+"://"+$location.host()+":"+$location.port()+"/cms-api/",
        urlBaseMedia: $location.protocol()+"://"+$location.host()+":"+$location.port()+"/",
        media_path: $location.protocol()+"://"+$location.host()+":"+$location.port()+"/media/",
        folder_img: $location.protocol()+"://"+$location.host()+":"+$location.port()+"/default-image/folder.png",
        default_img: $location.protocol()+"://"+$location.host()+":"+$location.port()+"/default-img/no-image100x100.png",
    	// urlBase: $location.protocol()+"://"+$location.host()+":3007/cms-api/",
    	// media_path: $location.protocol()+"://"+$location.host()+":3007/media/",
    	// folder_img: $location.protocol()+"://"+$location.host()+":3007/default-image/folder.png",
    	// default_img: $location.protocol()+"://"+$location.host()+":3007/default-img/no-image100x100.png"

    };
 }]);