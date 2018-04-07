var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('app.profile', {
        url:'/profile',
        templateUrl: 'app/profile/views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/profile/controllers/profile.js',
                    'app/profile/services/profile.js'
                    ]
                });
            }
        }
    });
}]);
