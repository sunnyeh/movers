var myApp = angular.module('myApp');
myApp.controller('DashboardCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  	$rootScope.pageTitle= "Dashboard";
    $rootScope.pageSubTitle = ".";
    console.log("aaa")
	

}]);