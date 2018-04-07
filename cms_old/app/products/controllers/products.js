var myApp = angular.module('myApp');
myApp.controller('ProductsCtrl', ['$scope','$rootScope','$timeout','productService', function($scope,$rootScope,$timeout,productService) {
	$rootScope.pageTitle= "Products";
    $rootScope.pageSubTitle = "Lists";
	$scope.loader=false;
   	$scope.itemPerPage="10";
	var getProduct = function(){
		$scope.loader=true;
		productService.getProduct($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.productData = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Product",$scope.productData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getProduct();

	$scope.deleteProduct = function(product){
		$scope.loader=true;
		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this imaginary file!",
			type: "warning",
			showCancelButton: true,
			confirmButtonClass: "btn-danger",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel plx!",
			closeOnConfirm: false,
			closeOnCancel: false
		},
		function(isConfirm) {
			if (isConfirm) {
				console.log(product);
				productService.deleteProduct($rootScope.confHeader,product.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.productData.indexOf(product);
		    			$scope.productData.splice(index, 1);
			    		swal("Deleted!", "Your imaginary file has been deleted.", "success");
					} else {
						$rootScope.alertMessage(Data.message,'error');
					}
					$scope.loader=false;
				},function(error){
					$rootScope.alertMessage(error,'error');
					$scope.loader=false;
				})
			} else {
			    swal("Cancelled", "Your imaginary file is safe :)", "error");
				$scope.loader=false;
			}
		});
	}

	$scope.statusProduct = function(product){
		$scope.loader=true;
		productService.statusProduct($rootScope.confHeader,product.id,product.status).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$rootScope.alertMessage(Data.message,'success');
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
}]);