var myApp = angular.module('myApp');
myApp.controller('EnquiryCtrl', ['$scope','$rootScope','$timeout','enquiryService', function($scope,$rootScope,$timeout,enquiryService) {
    $rootScope.pageTitle= "Enquery";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";
	var getEnquiry = function(){
		$scope.loader=true;
		enquiryService.getEnquiry($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.enquiryData = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Enquiry",$scope.enquiryData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getEnquiry();
	$scope.statusEnquiry = function(enquiry){
		$scope.loader=true;
		enquiryService.statusEnquiry($rootScope.confHeader,enquiry.id,enquiry.status).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$rootScope.alertMessage(Data.message,'success');
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
}]);