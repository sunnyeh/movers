  var myApp = angular.module('myApp');
myApp.controller('ProfileCtrl', ['$scope','$rootScope','$timeout','profileService','$location', function($scope,$rootScope,$timeout,profileService,$location) {
	$rootScope.pageTitle= "Profile";
    $rootScope.pageSubTitle = ".";
	$rootScope.userData={}

	var getProfile = function(){
		profileService.getProfile($rootScope.confHeader).then(function(success){
			var Data = success.data;
			if(Data.status){
				$rootScope.userData = Data.data;
				localStorage.setItem("Userdata", JSON.stringify($rootScope.userData));
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getProfile();
	$scope.saveProfile=function(){
		console.log($rootScope.userData);
		var formData = new FormData();
		if(angular.isUndefined($rootScope.userData.name) || $rootScope.userData.name == null || $rootScope.userData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    } else {
	    	formData.append("name",$rootScope.userData.name);
	    }
	    if(angular.isUndefined($rootScope.userData.email) || $rootScope.userData.email == null || $rootScope.userData.email == "")
	    {
		     $rootScope.alertMessage('Please select the email',"error");
		     return;      
	    }
	    else
	    {
	    	if($rootScope.mailExp.test($rootScope.userData.email))
		    {
	    		formData.append("email",$rootScope.userData.email);
		    }
		    else{
		    	$rootScope.alertMessage('Notification email address not valid',"error");
		        return;
		    }
	    }
	    if(angular.isUndefined($rootScope.userData.address) || $rootScope.userData.address == null || $rootScope.userData.address == "")
	    {
		     $rootScope.alertMessage('Please select the address',"error");
		     return;      
	    }else {
	    	formData.append("address",$rootScope.userData.address);
	    }	    
	    if(angular.isUndefined($rootScope.userData.phone) || $rootScope.userData.phone == null || $rootScope.userData.phone == "")
	    {
		     $rootScope.alertMessage('Please select the phone',"error");
		     return;      
	    }else {
	    	formData.append("phone",$rootScope.userData.phone);
	    }
	    if(angular.isUndefined($rootScope.userData.image) || $rootScope.userData.image == null || $rootScope.userData.image == "")
	    {
		     $rootScope.alertMessage('Please select the image',"error");
		     return;      
	    }else 
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.userData.image =$scope.userData.image.replace(location,"");
	    	formData.append("image",$rootScope.userData.image);
	    }
	    console.log($rootScope.userData);
	    profileService.postProfile(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		localStorage.setItem("Userdata", JSON.stringify($rootScope.userData));
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}

	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	}
}]);