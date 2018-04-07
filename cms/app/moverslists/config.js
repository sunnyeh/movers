var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('app.moverslists', {
        url:'/moverslists',
        templateUrl: 'app/moverslists/views/moverslists.html',
        controller: 'MoverslistesCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/moverslists/controllers/moverslists.js',
                    'app/moverslists/services/moverslists.js'
                    ]
                });
            }
        }
    }).state('app.add-moverslist', {
        url:'/add-moverslist',
        templateUrl: 'app/moverslists/views/add-moverslist.html',
        controller: 'AddMoverslistCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/moverslists/controllers/add-moverslist.js',
                    'app/moverslists/services/moverslists.js'
                    ]
                });
            }
        }
    }).state('app.moverslist-details', {
        url:'/moverslist-details/:id',
        templateUrl: 'app/moverslists/views/add-moverslist.html',
        controller: 'MoverslistDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/moverslists/controllers/moverslist-details.js',
                    'app/moverslists/services/moverslists.js'
                    ]
                });
            }
        }
    });
}]);
