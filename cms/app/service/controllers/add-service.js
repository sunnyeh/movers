var myApp = angular.module('myApp');
myApp.controller('AddServiceCtrl', ['$scope','$rootScope','$timeout','servicesService','$location', function($scope,$rootScope,$timeout,servicesService,$location) {
	$rootScope.pageTitle= "Service";
    $rootScope.pageSubTitle = "Add";
	$scope.serviceData={}
	$scope.serviceData.status="1";
	$scope.saveService=function(){
		console.log($scope.serviceData);
		var formData = new FormData();
		if(angular.isUndefined($scope.serviceData.name) || $scope.serviceData.name == null || $scope.serviceData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.serviceData.name);
	    }
	    if(angular.isUndefined($scope.serviceData.slug) || $scope.serviceData.slug == null || $scope.serviceData.slug == "")
	    {
		     $rootScope.alertMessage('Please enter the slug',"error");
		     return;      
	    }else{
	    	formData.append("slug",$scope.serviceData.slug);
	    }
	    if(angular.isUndefined($scope.serviceData.short_desc) || $scope.serviceData.short_desc == null || $scope.serviceData.short_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the short description',"error");
		     return;      
	    }else{
	    	formData.append("short_desc",$scope.serviceData.short_desc);
	    }
	    if(angular.isUndefined($scope.serviceData.long_desc) || $scope.serviceData.long_desc == null || $scope.serviceData.long_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the long description',"error");
		     return;      
	    }else{
	    	formData.append("long_desc",$scope.serviceData.long_desc);
	    }
	    if(angular.isUndefined($scope.serviceData.icon) || $scope.serviceData.icon == null || $scope.serviceData.icon == "")
	    {
		     $rootScope.alertMessage('Please enter the icon',"error");
		     return;      
	    }else{
	    	formData.append("icon",$scope.serviceData.icon);
	    }
	    if(angular.isUndefined($scope.serviceData.list_image) || $scope.serviceData.list_image == null || $scope.serviceData.list_image == "")
	    {
		     $rootScope.alertMessage('Please select the list image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.serviceData.list_image =$scope.serviceData.list_image.replace(location,"");
	    	formData.append("list_image",$scope.serviceData.list_image);
	    }
	    if(angular.isUndefined($scope.serviceData.cover_img) || $scope.serviceData.cover_img == null || $scope.serviceData.cover_img == "")
	    {
		     $rootScope.alertMessage('Please select the cover image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.serviceData.cover_img =$scope.serviceData.cover_img.replace(location,"");
	    	formData.append("cover_img",$scope.serviceData.cover_img);
	    }
	    if(angular.isUndefined($scope.serviceData.sort_order) || $scope.serviceData.sort_order == null || $scope.serviceData.sort_order == "")
	    {
		     formData.append("sort_order",1);
		     return;      
	    }else{
	    	if($rootScope.numExp.test($scope.serviceData.sort_order))
		    {
	    		formData.append("sort_order",$scope.serviceData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.serviceData.status);
	    formData.append("meta_title",$scope.serviceData.meta_title);
	    formData.append("meta_desc",$scope.serviceData.meta_desc);
	    console.log("Service",$scope.serviceData);
	    servicesService.postService(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	console.log("header",$rootScope.confHeader);
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/services"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	}

}]);