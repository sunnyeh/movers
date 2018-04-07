var myApp = angular.module('myApp');
myApp.controller('CategoryDetailsCtrl', ['$scope','$rootScope','$timeout','categoryService','$stateParams','$location','Global', function($scope,$rootScope,$timeout,categoryService,$stateParams,$location,Global) {
	$rootScope.pageTitle= "Category";
    $rootScope.pageSubTitle = "Details";
	$scope.categoryData={}
	$scope.categoryData.status="1";

	
	var getDetailCategory = function(_id){
		categoryService.getDetailCategory($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.categoryData = Data.data;
				console.log("Category",$scope.categoryData);
				$scope.categoryData.status = $scope.categoryData.status.toString();
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getDetailCategory($stateParams.id);
	$scope.saveCategory=function()
	{
		var formData = new FormData();
	    if(angular.isUndefined($scope.categoryData.name) || $scope.categoryData.name == null || $scope.categoryData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the Category Name',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("name",$scope.categoryData.name);
	    }
	    if(angular.isUndefined($scope.categoryData.slug) || $scope.categoryData.slug == null || $scope.categoryData.slug == "")
	    {
		     $rootScope.alertMessage('Please enter the slug',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("slug",$scope.categoryData.slug);
	    }
	    if(angular.isUndefined($scope.categoryData.short_desc) || $scope.categoryData.short_desc == null || $scope.categoryData.short_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the Short Description',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("short_desc",$scope.categoryData.short_desc);
	    }
	    if(angular.isUndefined($scope.categoryData.list_image) || $scope.categoryData.list_image == null || $scope.categoryData.list_image == "")
	    {
		    $rootScope.alertMessage('Please Select the list image',"error");
		    return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.categoryData.list_image =$scope.categoryData.list_image.replace(location,"");
	    	formData.append("list_image",$scope.categoryData.list_image);
	    }
	    if(angular.isUndefined($scope.categoryData.cover_image) || $scope.categoryData.cover_image == null || $scope.categoryData.cover_image == "")
	    {
		     $rootScope.alertMessage('Please Select the cover image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.categoryData.cover_image =$scope.categoryData.cover_image.replace(location,"");
	    	formData.append("cover_image",$scope.categoryData.cover_image);
	    }
	    formData.append("meta_title",$scope.categoryData.meta_title);
	    formData.append("meta_desc",$scope.categoryData.meta_desc);
	    if(angular.isUndefined($scope.categoryData.sort_order) || $scope.categoryData.sort_order == null || $scope.categoryData.sort_order == "")
	    {
		    formData.append("sort_order",1);    
	    }else{
	    	if($rootScope.numExp.test($scope.categoryData.sort_order))
		    {
	    		formData.append("sort_order",$scope.categoryData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.categoryData.status);
	    formData.append("id",$stateParams.id);
	    categoryService.postCategory(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	console.log("Data",Data);
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/categorys"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	console.log("error",error);
	    	$rootScope.alertMessage(error,'error')
	    })
	}
}]);