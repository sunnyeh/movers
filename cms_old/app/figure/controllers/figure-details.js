var myApp = angular.module('myApp');
myApp.controller('FigureDetailsCtrl', ['$scope','$rootScope','$timeout','figureService','$stateParams','$location', function($scope,$rootScope,$timeout,figureService,$stateParams,$location) {
	$rootScope.pageTitle= "Figure";
    $rootScope.pageSubTitle = "Details";
	$scope.figureData={}
	$scope.figureData.status="1";
	var getDetailFigure = function(_id){
		figureService.getDetailFigure($rootScope.confHeader,_id).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.figureData = Data.data;
				console.log("Figure",$scope.figureData);
				$scope.figureData.status = $scope.figureData.status.toString();
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		},function(error){
			$rootScope.alertMessage(error,'error');
		})
	}
	getDetailFigure($stateParams.id);
	$scope.saveFigure=function(){
		var formData = new FormData();
		if(angular.isUndefined($scope.figureData.name) || $scope.figureData.name == null || $scope.figureData.name == "")
	    {
		     $rootScope.alertMessage('Please enter the name',"error");
		     return;      
	    }else{
	    	formData.append("name",$scope.figureData.name);
	    }
		if(angular.isUndefined($scope.figureData.figures) || $scope.figureData.figures == null || $scope.figureData.figures == "")
	    {
		     $rootScope.alertMessage('Please enter the figures',"error");
		     return;      
	    }else{
	    	formData.append("figures",$scope.figureData.figures);
	    }
	    if(angular.isUndefined($scope.figureData.symbol) || $scope.figureData.symbol == null || $scope.figureData.symbol == "")
	    {
		     $rootScope.alertMessage('Please enter the symbol',"error");
		     return;      
	    }else{
	    	formData.append("symbol",$scope.figureData.symbol);
	    }
	    if(angular.isUndefined($scope.figureData.icon) || $scope.figureData.icon == null || $scope.figureData.icon == "")
	    {
		     $rootScope.alertMessage('Please enter the icon',"error");
		     return;      
	    }else{
	    	formData.append("icon",$scope.figureData.icon);
	    }
	    if(angular.isUndefined($scope.figureData.image) || $scope.figureData.image == null || $scope.figureData.image == "")
	    {
		     $rootScope.alertMessage('Please enter the image',"error");
		     return;      
	    }else{
	    	var location = $location.protocol()+"://"+$location.host()+":"+$location.port(); 
      		$scope.figureData.image =$scope.figureData.image.replace(location,"");
	    	formData.append("image",$scope.figureData.image);
	    }
	    if(angular.isUndefined($scope.figureData.sort_order) || $scope.figureData.sort_order == null || $scope.figureData.sort_order == "")
	    {
		     formData.append("sort_order",1);
		     return;      
	    }else{
	    	if($rootScope.numExp.test($scope.figureData.sort_order))
		    {
	    		formData.append("sort_order",$scope.figureData.sort_order);
	    	}
		    else{
		    	$rootScope.alertMessage('Sort Order only in digit',"error");
		        return;
		    }
	    }
	    formData.append("status",$scope.figureData.status);
	    console.log("Figure",$scope.figureData);
	    formData.append("id",$stateParams.id);
	    figureService.postFigure(formData,$rootScope.confHeader).then(function(success){
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