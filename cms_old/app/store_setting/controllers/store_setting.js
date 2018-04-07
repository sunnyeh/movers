var myApp = angular.module('myApp');
myApp.controller('StoreSettingCtrl', ['$scope','$rootScope','$timeout','storeService','$location', function($scope,$rootScope,$timeout,storeService,$location) {
	$rootScope.pageTitle= "Store Setting";
    $rootScope.pageSubTitle = "Details";
	$scope.storeData={}
	var getStore = function(){
		storeService.getStore($rootScope.confHeader).then(function(success){
			var Data = success.data;
			if(Data.status){
				$scope.storeData = Data.data;
				console.log("data :",Data);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function (error){
				$rootScope.alertMessage(error,'error');
			
		})
	}
	getStore();
	$scope.saveStore=function(){
		console.log($scope.storeData);
		var formData = new FormData();
		if(angular.isUndefined($scope.storeData.name) || $scope.storeData.name == null || $scope.storeData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else {
	    	formData.append("name",$scope.storeData.name);
	    }
	    if(angular.isUndefined($scope.storeData.description) || $scope.storeData.description == null || $scope.storeData.description == "")
	    {
		     $rootScope.alertMessage('Please enter the description',"error");
		     return;      
	    }else {
	    	formData.append("description",$scope.storeData.description);
	    }
	    if(angular.isUndefined($scope.storeData.tagline) || $scope.storeData.tagline == null || $scope.storeData.tagline == "")
	    {
		     $rootScope.alertMessage('Please enter the tagline',"error");
		     return;      
	    }else {
	    	formData.append("tagline",$scope.storeData.tagline);
	    }
	    if(angular.isUndefined($scope.storeData.logo) || $scope.storeData.logo == null || $scope.storeData.logo == "")
	    {
		     $rootScope.alertMessage('Please select the logo',"error");
		     return;      
	    }else 
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.storeData.logo =$scope.storeData.logo.replace(location,"");
	    	formData.append("logo",$scope.storeData.logo);
	    }
	    if(angular.isUndefined($scope.storeData.notify_email) || $scope.storeData.notify_email == null || $scope.storeData.notify_email == "")
	    {
		     $rootScope.alertMessage('Please select the notify email',"error");
		     return;      
	    }
	    else
	    {
	    	if($rootScope.mailExp.test($scope.storeData.notify_email))
		    {
	    		formData.append("notify_email",$scope.storeData.notify_email);
		    }
		    else{
		    	$rootScope.alertMessage('Notification email address not valid',"error");
		        return;
		    }
	    }
	    if(angular.isUndefined($scope.storeData.career_email) || $scope.storeData.career_email == null || $scope.storeData.career_email == "")
	    {
		     $rootScope.alertMessage('Please select the career email',"error");
		     return;      
	    }
	    else
	    {
	    	if($rootScope.mailExp.test($scope.storeData.career_email))
		    {		       
	    		formData.append("career_email",$scope.storeData.career_email); 
		    }
		    else{
		    	$rootScope.alertMessage('Career email address not valid',"error");
		        return;
		    }
	    }
	    if(angular.isUndefined($scope.storeData.conf_email) || $scope.storeData.conf_email == null || $scope.storeData.conf_email == "")
	    {
		    formData.append("conf_email",'');  
	    }
	    else
	    {
	    	if($rootScope.mailExp.test($scope.storeData.conf_email))
		    {		       
	    		formData.append("conf_email",$scope.storeData.conf_email); 
		    }
		    else{
		    	$rootScope.alertMessage('Configuration email address not valid',"error");
		        return;
		    }
	    }
	    formData.append("conf_password",$scope.storeData.conf_password);
	    formData.append("conf_host",$scope.storeData.conf_host);
	    formData.append("conf_port",$scope.storeData.conf_port);
	    formData.append("meta_title",$scope.storeData.meta_title);
	    formData.append("meta_desc",$scope.storeData.meta_desc);
	    storeService.postStore(formData,$rootScope.confHeader).then(function(success){
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