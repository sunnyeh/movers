var myApp = angular.module('myApp');
myApp.controller('AddSliderCtrl', ['$scope','$rootScope','$timeout','sliderService','$location', function($scope,$rootScope,$timeout,sliderService,$location) {
	$rootScope.pageTitle= "Slider";
    $rootScope.pageSubTitle = "Add";
	$scope.sliderData={}
	$scope.sliderData.status="1";
	$scope.saveSlider=function(){
		console.log($scope.sliderData);
		var formData = new FormData();
		if(angular.isUndefined($scope.sliderData.name) || $scope.sliderData.name == null || $scope.sliderData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.sliderData.name);
	    }
	    if(angular.isUndefined($scope.sliderData.list_image) || $scope.sliderData.list_image == null || $scope.sliderData.list_image == "")
	    {
		     $rootScope.alertMessage('Please select the list image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.sliderData.list_image =$scope.sliderData.list_image.replace(location,"");
	    	formData.append("list_image",$scope.sliderData.list_image);
	    }
	    if(angular.isUndefined($scope.sliderData.cover_image) || $scope.sliderData.cover_image == null || $scope.sliderData.cover_image == "")
	    {
		     $rootScope.alertMessage('Please enter the cover image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.sliderData.cover_image =$scope.sliderData.cover_image.replace(location,"");
	    	formData.append("cover_image",$scope.sliderData.cover_image);
	    }
	    if(angular.isUndefined($scope.sliderData.desc) || $scope.sliderData.desc == null || $scope.sliderData.desc == "")
	    {
		     $rootScope.alertMessage('Please enter the description',"error");
		     return;      
	    }else{
	    	formData.append("desc",$scope.sliderData.desc);
	    }
	    if(angular.isUndefined($scope.sliderData.sort_order) || $scope.sliderData.sort_order == null || $scope.sliderData.sort_order == "")
	    {
		    formData.append("sort_order",1);     
	    }else{
	    	if($rootScope.numExp.test($scope.sliderData.sort_order))
		    {
	    		formData.append("sort_order",$scope.sliderData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.sliderData.status);
	    console.log("Slider",$scope.sliderData);
	    sliderService.postSlider(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	console.log("header",$rootScope.confHeader);
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/sliders"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	}

}]);