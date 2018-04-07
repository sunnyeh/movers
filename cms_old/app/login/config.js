var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/views/login.html',
        controller: 'LoginCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/login/services/login.js',
                    'app/login/controllers/login.js'
                    ]
                });
            }
        }
    });
}]);
