var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
  	$stateProvider
      .state('app.addresses', {
        url:'/addresses',
        templateUrl: 'app/address/views/addresses.html',
        controller: 'AddressesCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/address/controllers/addresses.js',
                    'app/address/services/addresses.js'
                    ]
                });
            }
        }
    }).state('app.add-address', {
        url:'/add-address',
        templateUrl: 'app/address/views/add-address.html',
        controller: 'AddAddressCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/address/controllers/add-address.js',
                    'app/address/services/addresses.js'
                    ]
                });
            }
        }
    }).state('app.address-details', {
        url:'/address-details/:id',
        templateUrl: 'app/address/views/add-address.html',
        controller: 'AddressDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/address/controllers/address-details.js',
                    'app/address/services/addresses.js'
                    ]
                });
            }
        }
    });
}]);
