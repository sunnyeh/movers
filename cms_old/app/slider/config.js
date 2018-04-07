var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.sliders', {
        url:'/sliders',
        templateUrl: 'app/slider/views/sliders.html',
        controller: 'SlidersCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/slider/controllers/sliders.js',
                    'app/slider/services/slider.js'
                    ]
                });
            }
        }
    }).state('app.add-slider', {
        url:'/add-slider',
        templateUrl: 'app/slider/views/add-slider.html',
        controller: 'AddSliderCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/slider/controllers/add-slider.js',
                    'app/slider/services/slider.js'
                    ]
                });
            }
        }
    }).state('app.slider-details', {
        url:'/slider-details/:id',
        templateUrl: 'app/slider/views/add-slider.html',
        controller: 'SliderDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/slider/controllers/slider-details.js',
                    'app/slider/services/slider.js'
                    ]
                });
            }
        }
    });
}]);
