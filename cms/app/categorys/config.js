var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.categorys', {
        url:'/categorys',
        templateUrl: 'app/categorys/views/categorys.html',
        controller: 'CategorysCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/categorys/controllers/categorys.js',
                    'app/categorys/services/categorys.js'
                    ]
                });
            }
        }
    }).state('app.add-category', {
        url:'/add-category',
        templateUrl: 'app/categorys/views/add-category.html',
        controller: 'AddCategoryCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/categorys/controllers/add-category.js',
                    'app/categorys/services/categorys.js'
                    ]
                });
            }
        }
    }).state('app.category-details', {
        url:'/category-details/:id',
        templateUrl: 'app/categorys/views/add-category.html',
        controller: 'CategoryDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/categorys/controllers/category-details.js',
                    'app/categorys/services/categorys.js'
                    ]
                });
            }
        }
    });
}]);
