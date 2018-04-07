var myApp = angular.module('myApp');

myApp.config(["$stateProvider", "$ocLazyLoadProvider","$urlRouterProvider",function($stateProvider,$ocLazyLoadProvider,$urlRouterProvider) {
    $stateProvider
      .state('app.enquiry', {
        url:'/enquiry',
        templateUrl: 'app/enquiry/views/enquiry.html',
        controller: 'EnquiryCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/enquiry/controllers/enquiry.js',
                    'app/enquiry/services/enquiry.js'
                    ]
                });
            }
        }
    })
    .state('app.enquiry-details', {
        url:'/enquiry-details/:id',
        templateUrl: 'app/enquiry/views/edit-enquiry.html',
        controller: 'EnquiryDetailsCtrl',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'myApp',
                    files:[
                    'app/enquiry/controllers/enquiry-details.js',
                    'app/enquiry/services/enquiry.js'
                    ]
                });
            }
        }
    });
}]);
