var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('app.about', {
        url:'/about',
        templateUrl: 'app/about/views/about.html',
        controller: 'AboutCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/about/controllers/about.js',
                    'app/about/services/about.js'
                    ]
                });
            }
        }
    });
}]);
