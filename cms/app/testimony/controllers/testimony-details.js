var myApp = angular.module('myApp');
myApp.controller('TestimonyDetailsCtrl', ['$scope','$rootScope','$timeout','testimonyService','$stateParams','$location', function($scope,$rootScope,$timeout,testimonyService,$stateParams,$location) {
	$rootScope.pageTitle= "Testimonials";
    $rootScope.pageSubTitle = "Details";
	$scope.testimonyData={}
	$scope.testimonyData.status="1";
	var getDetailTestimony = function(_id){
		testimonyService.getDetailTestimony($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.testimonyData = Data.data;
				console.log("Testimony",$scope.testimonyData);
				$scope.testimonyData.status = $scope.testimonyData.status.toString();
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getDetailTestimony($stateParams.id);
	$scope.saveTestimony=function(){
		console.log($scope.testimonyData);
		var formData = new FormData();
		if(angular.isUndefined($scope.testimonyData.name) || $scope.testimonyData.name == null || $scope.testimonyData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.testimonyData.name);
	    }
	    if(angular.isUndefined($scope.testimonyData.message) || $scope.testimonyData.message == null || $scope.testimonyData.message == "")
	    {
		     $rootScope.alertMessage('Please enter the message',"error");
		     return;      
	    }else{
	    	formData.append("message",$scope.testimonyData.message);
	    }
	    if(angular.isUndefined($scope.testimonyData.company) || $scope.testimonyData.company == null || $scope.testimonyData.company == "")
	    {
		     $rootScope.alertMessage('Please enter the company',"error");
		     return;      
	    }else{
	    	formData.append("company",$scope.testimonyData.company);
	    }
	    if(angular.isUndefined($scope.testimonyData.designation) || $scope.testimonyData.designation == null || $scope.testimonyData.designation == "")
	    {
		     $rootScope.alertMessage('Please enter the designation',"error");
		     return;      
	    }else{
	    	formData.append("designation",$scope.testimonyData.designation);
	    }
	    if(angular.isUndefined($scope.testimonyData.image) || $scope.testimonyData.image == null || $scope.testimonyData.image == "")
	    {
		     $rootScope.alertMessage('Please enter the image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.testimonyData.image =$scope.testimonyData.image.replace(location,"");
	    	formData.append("image",$scope.testimonyData.image);
	    }
	    if(angular.isUndefined($scope.testimonyData.sort_order) || $scope.testimonyData.sort_order == null || $scope.testimonyData.sort_order == "")
	    {
		     formData.append("sort_order",1);
		     return;      
	    }else{
	    	if($rootScope.numExp.test($scope.testimonyData.sort_order))
		    {
	    		formData.append("sort_order",$scope.testimonyData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.testimonyData.status);
	    formData.append("id",$stateParams.id);
	    console.log("Testimony",$scope.testimonyData);
	    testimonyService.postTestimony(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	console.log("header",$rootScope.confHeader);
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/testimonys"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	}

}]);