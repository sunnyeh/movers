var myApp = angular.module('myApp');
myApp.controller('AboutCtrl', ['$scope','$rootScope','$timeout','aboutService','$location', function($scope,$rootScope,$timeout,aboutService,$location) {
	
    $rootScope.pageTitle= "About";
    $rootScope.pageSubTitle = "Details";
	$scope.aboutData={};
	var getAbout = function(){
		aboutService.getAbout($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.aboutData = Data.data;
				console.log("About",$scope.aboutData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getAbout();
	$scope.saveAbout=function(){
		console.log($scope.aboutData);
		var formData = new FormData();
		if(angular.isUndefined($scope.aboutData.title) || $scope.aboutData.title == null || $scope.aboutData.title == "")
	    {
		     $rootScope.alertMessage('Please enter the title',"error");
		     return;      
	    }else{
	    	formData.append("title",$scope.aboutData.title);
	    }
	    if(angular.isUndefined($scope.aboutData.short_desc) || $scope.aboutData.short_desc == null || $scope.aboutData.short_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the short description',"error");
		     return;      
	    }else{
	    	formData.append("short_desc",$scope.aboutData.short_desc);
	    }
	    if(angular.isUndefined($scope.aboutData.long_desc) || $scope.aboutData.long_desc == null || $scope.aboutData.long_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the long description',"error");
		     return;      
	    }else{
	    	formData.append("long_desc",$scope.aboutData.long_desc);
	    }
	    if(angular.isUndefined($scope.aboutData.mission) || $scope.aboutData.mission == null || $scope.aboutData.mission == "")
	    {
		     $rootScope.alertMessage('Please enter the mission',"error");
		     return;      
	    }else{
	    	formData.append("mission",$scope.aboutData.mission);
	    }
	    if(angular.isUndefined($scope.aboutData.vision) || $scope.aboutData.vision == null || $scope.aboutData.vision == "")
	    {
		     $rootScope.alertMessage('Please enter the vision',"error");
		     return;      
	    }else{
	    	formData.append("vision",$scope.aboutData.vision);
	    }
	    if(angular.isUndefined($scope.aboutData.listing_img) || $scope.aboutData.listing_img == null || $scope.aboutData.listing_img == "")
	    {
		     $rootScope.alertMessage('Please select the listing image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.aboutData.listing_img =$scope.aboutData.listing_img.replace(location,"");
	    	formData.append("listing_img",$scope.aboutData.listing_img);
	    }
	    if(angular.isUndefined($scope.aboutData.cover_img) || $scope.aboutData.cover_img == null || $scope.aboutData.cover_img == "")
	    {
		     $rootScope.alertMessage('Please select the cover image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.aboutData.cover_img =$scope.aboutData.cover_img.replace(location,"");
	    	formData.append("cover_img",$scope.aboutData.cover_img);
	    }
	    formData.append("meta_title",$scope.aboutData.meta_title);
	    formData.append("meta_desc",$scope.aboutData.meta_desc);
	    console.log("About",$scope.aboutData);
	    aboutService.postAbout(formData,$rootScope.confHeader).then(function(success){
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