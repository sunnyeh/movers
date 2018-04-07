var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.products', {
        url:'/products',
        templateUrl: 'app/products/views/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/products/controllers/products.js',
                    'app/products/services/products.js',
                    ]
                });
            }
        }
    }).state('app.add-product', {
        url:'/add-product',
        templateUrl: 'app/products/views/add-product.html',
        controller: 'AddProductCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/products/controllers/add-product.js',
                    'app/products/services/products.js',
                    'app/categorys/services/categorys.js',
                    ]
                });
            }
        }
    }).state('app.product-details', {
        url:'/product-details/:id',
        templateUrl: 'app/products/views/add-product.html',
        controller: 'ProductDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/products/controllers/product-details.js',
                    'app/products/services/products.js',
                    'app/categorys/services/categorys.js',
                    ]
                });
            }
        }
    });
}]);
