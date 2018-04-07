var myApp = angular.module('myApp',[
		'ui.router',
		'oc.lazyLoad',
        'ui.tinymce',
        'ui.bootstrap',
        'oitozero.ngSweetAlert',
        'angularUtils.directives.dirPagination'
	]);

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$ocLazyLoadProvider.config({
	    'debug': false, // For debugging 'true/false'
	    'events': true // For Event 'true/false'
	});
  	$urlRouterProvider.otherwise('/app/dashboard');
  	$stateProvider
      .state('app', {
        url:'/app',
        templateUrl: 'app/main/views/main.html',
        controller: 'GlobalCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/main/controllers/main.js',
                    'app/main/services/main.js',
                    'js/directives/image-manager/image-manager.js',
                    'js/directives/image-manager/services/image-manager.js',
                    ]
                });
            }
        }
    });
}]);
