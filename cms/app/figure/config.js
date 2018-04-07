var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.figures', {
        url:'/figures',
        templateUrl: 'app/figure/views/figures.html',
        controller: 'FiguresCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/figure/controllers/figures.js',
                    'app/figure/services/figures.js'
                    ]
                });
            }
        }
    }).state('app.add-figure', {
        url:'/add-figure',
        templateUrl: 'app/figure/views/add-figure.html',
        controller: 'AddFigureCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/figure/controllers/add-figure.js',
                    'app/figure/services/figures.js'
                    ]
                });
            }
        }
    }).state('app.figure-details', {
        url:'/figure-details/:id',
        templateUrl: 'app/figure/views/add-figure.html',
        controller: 'FigureDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/figure/controllers/figure-details.js',
                    'app/figure/services/figures.js'
                    ]
                });
            }
        }
    });
}]);
