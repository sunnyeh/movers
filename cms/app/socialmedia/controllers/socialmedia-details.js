var myApp = angular.module('myApp');
myApp.controller('SocialmediaDetailsCtrl', ['$scope','$rootScope','$timeout','socialmediaService','$stateParams','$location', function($scope,$rootScope,$timeout,socialmediaService,$stateParams,$location) {
	$rootScope.pageTitle= "Social Media";
    $rootScope.pageSubTitle = "Details";
	$scope.socialData={}
	$scope.socialData.status="1";
	var getDetailSocialmedia = function(_id){
		socialmediaService.getDetailSocialmedia($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.socialData = Data.data;
				console.log("Socialmedia",$scope.socialData);
				$scope.socialData.status = $scope.socialData.status.toString();
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getDetailSocialmedia($stateParams.id);
	$scope.saveSocialmedia=function(){
		console.log($scope.socialData);
		var formData = new FormData();
		if(angular.isUndefined($scope.socialData.name) || $scope.socialData.name == null || $scope.socialData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.socialData.name);
	    }
	    if(angular.isUndefined($scope.socialData.icon) || $scope.socialData.icon == null || $scope.socialData.icon == "")
	    {
		     $rootScope.alertMessage('Please enter the icon',"error");
		     return;      
	    }else{
	    	formData.append("icon",$scope.socialData.icon);
	    }
	    if(angular.isUndefined($scope.socialData.image) || $scope.socialData.image == null || $scope.socialData.image == "")
	    {
		     $rootScope.alertMessage('Please enter the image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.socialData.image =$scope.socialData.image.replace(location,"");
	    	formData.append("image",$scope.socialData.image);
	    }
	    if(angular.isUndefined($scope.socialData.link) || $scope.socialData.link == null || $scope.socialData.link == "")
	    {
		     $rootScope.alertMessage('Please enter the link',"error");
		     return;      
	    }else{
	    	formData.append("link",$scope.socialData.link);
	    }
	    if(angular.isUndefined($scope.socialData.sort_order) || $scope.socialData.sort_order == null || $scope.socialData.sort_order == "")
	    {
		     formData.append("sort_order",1);
		     return;      
	    }else{
	    	if($rootScope.numExp.test($scope.socialData.sort_order))
		    {
	    		formData.append("sort_order",$scope.socialData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.socialData.status);
	    console.log("Socialmedia",$scope.socialData);
	    formData.append("id",$stateParams.id)
	    socialmediaService.postSocialmedia(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	console.log("header",$rootScope.confHeader);
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/socialmedias"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	}
	

}]);