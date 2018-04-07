var myApp = angular.module('myApp');
myApp.controller('ProductDetailsCtrl', ['$scope','$rootScope','$timeout','productService','categoryService','$stateParams','$location','Global', function($scope,$rootScope,$timeout,productService,categoryService,$stateParams,$location,Global) {
	$rootScope.pageTitle= "Product";
    $rootScope.pageSubTitle = "Details";
	$scope.productData={};
	$scope.productData.attr=[];
	$scope.productData.status="1";
	$scope.TemparyAttrData={};

	var getCategory = function(){
		$scope.loader=true;
		categoryService.getCategory($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.categorys = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				$scope.productData.category_id=$scope.categorys[0].id.toString();
				console.log("Category",$scope.categorys);
				getDetailProduct($stateParams.id);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getCategory();
	var getDetailProduct = function(_id){
		productService.getDetailProduct($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.productData = Data.data;
				console.log("Product",$scope.productData);
				$scope.productData.status = $scope.productData.status.toString();
				$scope.productData.category_id = $scope.productData.category_id.toString();
				$scope.productData.attr = JSON.parse(decodeURIComponent(($scope.productData.attr)));
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	$scope.addRow=function()
	{	
		if($scope.TemparyAttrData.name == "" || $scope.TemparyAttrData.name == null || $scope.TemparyAttrData.name == undefined)
		{
			$rootScope.alertMessage('Please Enter Attribute Name',"error");
		     return;  
		}
		else if($scope.TemparyAttrData.value == "" || $scope.TemparyAttrData.value == null || $scope.TemparyAttrData.value == undefined)
		{
			$rootScope.alertMessage('Please Enter Attribute Value',"error");
		     return;  
		}
		else
		{
			$scope.productData.attr.push({ 'name':$scope.TemparyAttrData.name, 'value': $scope.TemparyAttrData.value });
			$scope.TemparyAttrData.name='';
			$scope.TemparyAttrData.value='';
		}
	}
	$scope.removeRow = function(name,value)
	{				
			var index = -1;		
			var comArr = eval( $scope.productData.attr );
			for( var i = 0; i < comArr.length; i++ ) {
				if( comArr[i].name === name && comArr[i].value === value ) {
					index = i;
					break;
				}
			}
			if( index === -1 ) {
				alert( "Something gone wrong" );
			}
			$scope.productData.attr.splice( index, 1 );		
	}
	$scope.saveProduct=function()
	{
		var formData = new FormData();
		if(angular.isUndefined($scope.productData.category_id) || $scope.productData.category_id == null || $scope.productData.category_id == "")
	    {
		     $rootScope.alertMessage('Please Select the Category',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("category_id",$scope.productData.category_id);
	    }
	    if(angular.isUndefined($scope.productData.name) || $scope.productData.name == null || $scope.productData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the Product Name',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("name",$scope.productData.name);
	    }
	    if(angular.isUndefined($scope.productData.slug) || $scope.productData.slug == null || $scope.productData.slug == "")
	    {
		     $rootScope.alertMessage('Please enter the slug',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("slug",$scope.productData.slug);
	    }
	    if(angular.isUndefined($scope.productData.short_desc) || $scope.productData.short_desc == null || $scope.productData.short_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the Short Description',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("short_desc",$scope.productData.short_desc);
	    }
	    if(angular.isUndefined($scope.productData.long_desc) || $scope.productData.long_desc == null || $scope.productData.long_desc == "")
	    {
		     $rootScope.alertMessage('Please enter the Long Description',"error");
		     return;      
	    }
	    else
	    {
	    	formData.append("long_desc",$scope.productData.long_desc);
	    }
	    if(angular.isUndefined($scope.productData.list_image) || $scope.productData.list_image == null || $scope.productData.list_image == "")
	    {
		     $rootScope.alertMessage('Please Select the list image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.productData.list_image =$scope.productData.list_image.replace(location,"");
	    	formData.append("list_image",$scope.productData.list_image);
	    }
	    if(angular.isUndefined($scope.productData.cover_image) || $scope.productData.cover_image == null || $scope.productData.cover_image == "")
	    {
		     $rootScope.alertMessage('Please Select the cover image',"error");
		     return;      
	    }else
	    {
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.productData.cover_image =$scope.productData.cover_image.replace(location,"");
	    	formData.append("cover_image",$scope.productData.cover_image);
	    }
	    formData.append("meta_title",$scope.productData.meta_title);
	    formData.append("meta_desc",$scope.productData.meta_desc);
	    if(angular.isUndefined($scope.productData.sort_order) || $scope.productData.sort_order == null || $scope.productData.sort_order == "")
	    {
		     formData.append("sort_order",1);
		     return;      
	    }else{
	    	if($rootScope.numExp.test($scope.productData.sort_order))
		    {
	    		formData.append("sort_order",$scope.productData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.productData.status);
	    console.log("$scope.productData.attr",$scope.productData.attr);
	    formData.append("attr",encodeURIComponent(JSON.stringify($scope.productData.attr)));
	    formData.append("id",$stateParams.id);
	    productService.postProduct(formData,$rootScope.confHeader).then(function(success){
	    	var Data = success.data
	    	console.log("Data",Data);
	    	if(Data.status){
	    		console.log(Data)
	    		$rootScope.alertMessage(Data.message,'success');
	    		window.location="#!/app/products"
	    	}else{
	    		$rootScope.alertMessage(Data.message,'error')
	    	}	
	    },function(error){
	    	console.log("error",error);
	    	$rootScope.alertMessage(error,'error')
	    })
	}
}]);