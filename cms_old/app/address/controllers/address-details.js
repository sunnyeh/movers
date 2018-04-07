var myApp = angular.module('myApp');
myApp.controller('AddressDetailsCtrl', ['$scope','$rootScope','$timeout','addressService','$stateParams', function($scope,$rootScope,$timeout,addressService,$stateParams) {
	$rootScope.pageTitle= "Address";
    $rootScope.pageSubTitle = "Details";
	$scope.addressData={}
	$scope.addressData.status="1";
	var getDetailAddress = function(_id){
		addressService.getDetailAddress($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.addressData = Data.data;
				console.log("Address",$scope.addressData);
				$scope.addressData.status = $scope.addressData.status.toString();
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getDetailAddress($stateParams.id);
	$scope.saveAddress=function(){
		console.log($scope.addressData);
		var formData = new FormData();
		if(angular.isUndefined($scope.addressData.name) || $scope.addressData.name == null || $scope.addressData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.addressData.name);
	    }
	    if(angular.isUndefined($scope.addressData.address) || $scope.addressData.address == null || $scope.addressData.address == "")
	    {
		     $rootScope.alertMessage('Please enter the address',"error");
		     return;      
	    }else{
	    	formData.append("address",$scope.addressData.address);
	    }
	    if(angular.isUndefined($scope.addressData.city) || $scope.addressData.city == null || $scope.addressData.city == "")
	    {
		     $rootScope.alertMessage('Please enter the city',"error");
		     return;      
	    }else{
	    	formData.append("city",$scope.addressData.city);
	    }
	    if(angular.isUndefined($scope.addressData.state) || $scope.addressData.state == null || $scope.addressData.state == "")
	    {
		     $rootScope.alertMessage('Please enter the state',"error");
		     return;      
	    }else{
	    	formData.append("state",$scope.addressData.state);
	    }
	    if(angular.isUndefined($scope.addressData.country) || $scope.addressData.country == null || $scope.addressData.country == "")
	    {
		     $rootScope.alertMessage('Please enter the country',"error");
		     return;      
	    }else{
	    	formData.append("country",$scope.addressData.country);
	    }
	    if(angular.isUndefined($scope.addressData.phone_no) || $scope.addressData.phone_no == null || $scope.addressData.phone_no == "")
	    {
		     $rootScope.alertMessage('Please select the phone',"error");
		     return;      
	    }else{
	    	formData.append("phone_no",$scope.addressData.phone_no);
	    }
	    if(angular.isUndefined($scope.addressData.email) || $scope.addressData.email == null || $scope.addressData.email == "")
	    {
		     $rootScope.alertMessage('Please select the email',"error");
		     return;      
	    }
	    else
	    {
	    	if($rootScope.mailExp.test($scope.addressData.email))
		    {
	    		formData.append("email",$scope.addressData.email);
	    	}
		    else{
		    	$rootScope.alertMessage('Notification email address not valid',"error");
		        return;
		    }
	    }
	    if(angular.isUndefined($scope.addressData.geo_long) || $scope.addressData.geo_long == null || $scope.addressData.geo_long == "")
	    {
		     $rootScope.alertMessage('Please select the longitude',"error");
		     return;      
	    }else{
	    	formData.append("geo_long",$scope.addressData.geo_long);
	    }
	    if(angular.isUndefined($scope.addressData.geo_lat) || $scope.addressData.geo_lat == null || $scope.addressData.geo_lat == "")
	    {
		     $rootScope.alertMessage('Please select the latitude',"error");
		     return;      
	    }else{
	    	formData.append("geo_lat",$scope.addressData.geo_lat);
	    }
	    if(angular.isUndefined($scope.addressData.sort_order) || $scope.addressData.sort_order == null || $scope.addressData.sort_order == "")
	    {
		    formData.append("sort_order",1);
		    return;      
	    }else{
	    	if($rootScope.numExp.test($scope.addressData.sort_order))
		    {
	    		formData.append("sort_order",$scope.addressData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    	
	    } 
	    formData.append("status",$scope.addressData.status);
	    console.log("Address",$scope.addressData);
	   	formData.append("id",$stateParams.id);
	    addressService.postAddress(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
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