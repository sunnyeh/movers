var myApp = angular.module('myApp');
myApp.controller('EnquiryDetailsCtrl', ['$scope','$rootScope','$timeout','enquiryService','$stateParams', function($scope,$rootScope,$timeout,enquiryService,$stateParams) {
	$rootScope.pageTitle= "Enquery";
    $rootScope.pageSubTitle = "Details";
	$scope.enquiryData={}
	$scope.enquiryData.status="1";
	var getDetailEnquiry = function(_id){
		enquiryService.getDetailEnquiry($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			$scope.enquiryData = Data.data;
			console.log("Enquiry",$scope.enquiryData);
			$scope.enquiryData.status = $scope.enquiryData.status.toString();
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getDetailEnquiry($stateParams.id);
	$scope.saveEnquiry=function(){
		var formData = new FormData();
		
	    if(angular.isUndefined($scope.enquiryData.remark) || $scope.enquiryData.remark == null || $scope.enquiryData.remark == "")
	    {
		     $rootScope.alertMessage('Please enter the remark',"error");
		     return;      
	    }else{
	    	formData.append("remark",$scope.enquiryData.remark);
	    }
	    formData.append("status",$scope.enquiryData.status);
	    console.log("Enquiry",$scope.enquiryData);
	    formData.append("id",$stateParams.id);
	    enquiryService.postEnquiry(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	
	}
}]);