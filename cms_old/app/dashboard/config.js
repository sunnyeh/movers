var myApp = angular.module('myApp');

myApp.config(["$stateProvider",function($stateProvider) {
  	$stateProvider
      .state('app.dashboard', {
        url:'/dashboard',
        templateUrl: 'app/dashboard/views/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/dashboard/controllers/dashboard.js'
                    ]
                });
            }
        }
    });
}]);
