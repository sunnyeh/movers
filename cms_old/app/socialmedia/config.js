var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('app.socialmedias', {
        url:'/socialmedias',
        templateUrl: 'app/socialmedia/views/socialmedias.html',
        controller: 'SocialmediasCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/socialmedia/controllers/socialmedias.js',
                    'app/socialmedia/services/socialmedia.js'
                    ]
                });
            }
        }
    }).state('app.add-socialmedia', {
        url:'/add-socialmedia',
        templateUrl: 'app/socialmedia/views/add-socialmedia.html',
        controller: 'AddSocialmediaCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/socialmedia/controllers/add-socialmedia.js',
                    'app/socialmedia/services/socialmedia.js'
                    ]
                });
            }
        }
    }).state('app.socialmedia-details', {
        url:'/socialmedia-details/:id',
        templateUrl: 'app/socialmedia/views/add-socialmedia.html',
        controller: 'SocialmediaDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/socialmedia/controllers/socialmedia-details.js',
                    'app/socialmedia/services/socialmedia.js'
                    ]
                });
            }
        }
    });
}]);
