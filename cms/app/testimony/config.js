var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.testimonys', {
        url:'/testimonys',
        templateUrl: 'app/testimony/views/testimonys.html',
        controller: 'TestimonysCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/testimony/controllers/testimonys.js',
                    'app/testimony/services/testimony.js'
                    ]
                });
            }
        }
    }).state('app.add-testimony', {
        url:'/add-testimony',
        templateUrl: 'app/testimony/views/add-testimony.html',
        controller: 'AddTestimonyCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/testimony/controllers/add-testimony.js',
                    'app/testimony/services/testimony.js'
                    ]
                });
            }
        }
    }).state('app.testimony-details', {
        url:'/testimony-details/:id',
        templateUrl: 'app/testimony/views/add-testimony.html',
        controller: 'TestimonyDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/testimony/controllers/testimony-details.js',
                    'app/testimony/services/testimony.js'
                    ]
                });
            }
        }
    });
}]);
