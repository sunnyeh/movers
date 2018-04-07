var myApp = angular.module('myApp');
myApp.controller('MoverslistDetailsCtrl', ['$scope','$rootScope','$timeout','moverslistService','$stateParams', function($scope,$rootScope,$timeout,moverslistService,$stateParams) {
	$rootScope.pageTitle= "Moverslist";
    $rootScope.pageSubTitle = "Details";
	$scope.moverslistData={}
	$scope.moverslistData.status="1";
	var mailExp= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	var getDetailMoverslist = function(_id){
		moverslistService.getDetailMoverslist($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.moverslistData = Data.data;
				console.log("Moverslist",$scope.moverslistData);
				$scope.moverslistData.status = $scope.moverslistData.status.toString();
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getDetailMoverslist($stateParams.id);
	$scope.saveMoverslist=function(){
		console.log($scope.moverslistData);
		var formData = new FormData();
		if(angular.isUndefined($scope.moverslistData.name) || $scope.moverslistData.name == null || $scope.moverslistData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.moverslistData.name);
	    }
		if(angular.isUndefined($scope.moverslistData.slug) || $scope.moverslistData.slug == null || $scope.moverslistData.slug == "")
	    {
		     $rootScope.alertMessage('Please enter the slug',"error");
		     return;      
	    }else{
	    	formData.append("slug",$scope.moverslistData.slug);
	    }
	    if(angular.isUndefined($scope.moverslistData.company_name) || $scope.moverslistData.company_name == null || $scope.moverslistData.company_name == "")
	    {
		     $rootScope.alertMessage('Please enter the company_name',"error");
		     return;      
	    }else{
	    	formData.append("company_name",$scope.moverslistData.company_name);
	    }
	    if(angular.isUndefined($scope.moverslistData.company_desc) || $scope.moverslistData.company_desc == null || $scope.moverslistData.company_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the company_desc',"error");
		     return;      
	    }else{
	    	formData.append("company_desc",$scope.moverslistData.company_desc);
	    }
	    if(angular.isUndefined($scope.moverslistData.company_contact) || $scope.moverslistData.company_contact == null || $scope.moverslistData.company_contact == "")
	    {
		     $rootScope.alertMessage('Please enter the company_contact',"error");
		     return;      
	    }else{
	    	formData.append("company_contact",$scope.moverslistData.company_contact);
	    }
	    if(angular.isUndefined($scope.moverslistData.company_address) || $scope.moverslistData.company_address == null || $scope.moverslistData.company_address == "")
	    {
		     $rootScope.alertMessage('Please select the company address',"error");
		     return;      
	    }else{
	    	formData.append("company_address",$scope.moverslistData.company_address);
	    }
	    if(angular.isUndefined($scope.moverslistData.company_website) || $scope.moverslistData.company_website == null || $scope.moverslistData.company_website == "")
	    {
		     $rootScope.alertMessage('Please select the company_website',"error");
		     return;      
	    }else{
	    	formData.append("company_website",$scope.moverslistData.company_website);
	    }
	    if(angular.isUndefined($scope.moverslistData.company_email) || $scope.moverslistData.company_email == null || $scope.moverslistData.company_email == "")
	    {
		     $rootScope.alertMessage('Please select the company email',"error");
		     return;      
	    }
	    else
	    {
	    	if($rootScope.mailExp.test($scope.moverslistData.company_email))
		    {
	    		formData.append("company_email",$scope.moverslistData.company_email);
	    	}
		    else{
		    	$rootScope.alertMessage(' company email  not valid',"error");
		        return;
		    }
	    }
	    if(angular.isUndefined($scope.moverslistData.sort_order) || $scope.moverslistData.sort_order == null || $scope.moverslistData.sort_order == "")
	    {
		    formData.append("sort_order",1);
		    return;      
	    }else{
	    	if($rootScope.numExp.test($scope.moverslistData.sort_order))
		    {
	    		formData.append("sort_order",$scope.moverslistData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    	
	    } 
	    formData.append("status",$scope.moverslistData.status);
	    console.log("Moverslist",$scope.moverslistData);
	   	formData.append("id",$stateParams.id);
	    moverslistService.postMoverslist(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/moverslists"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	$rootScope.alertMessage(error,'error')
	    })
	}
	

	

}]);