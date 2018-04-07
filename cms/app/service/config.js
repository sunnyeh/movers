var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.services', {
        url:'/services',
        templateUrl: 'app/service/views/services.html',
        controller: 'ServicesCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/service/controllers/services.js',
                    'app/service/services/services.js'
                    ]
                });
            }
        }
    }).state('app.add-service', {
        url:'/add-service',
        templateUrl: 'app/service/views/add-service.html',
        controller: 'AddServiceCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/service/controllers/add-service.js',
                    'app/service/services/services.js'
                    ]
                });
            }
        }
    }).state('app.service-details', {
        url:'/service-details/:id',
        templateUrl: 'app/service/views/add-service.html',
        controller: 'ServiceDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/service/controllers/service-details.js',
                    'app/service/services/services.js'
                    ]
                });
            }
        }
    });
}]);
