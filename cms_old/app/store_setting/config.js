var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider", function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('app.store_setting', {
        url:'/store_setting',
        templateUrl: 'app/store_setting/views/store_setting.html',
        controller: 'StoreSettingCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/store_setting/controllers/store_setting.js',
                    'app/store_setting/services/store_setting.js'
                    ]
                });
            }
        }
    });
}]);
