var myApp = angular.module('myApp');
myApp.controller('CategorysCtrl', ['$scope','$rootScope','$timeout','categoryService', function($scope,$rootScope,$timeout,categoryService) {
	$rootScope.pageTitle= "Categories";
    $rootScope.pageSubTitle = "Lists";
	$scope.loader=false;
    $scope.itemPerPage="10";
	var getCategory = function(){
		$scope.loader=true;
		categoryService.getCategory($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.categoryData = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Category",$scope.categoryData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getCategory();

	$scope.deleteCategory = function(category){
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
				console.log(category);
				categoryService.deleteCategory($rootScope.confHeader,category.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.categoryData.indexOf(category);
		    			$scope.categoryData.splice(index, 1);
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

	$scope.statusCategory = function(category){
		$scope.loader=true;
		categoryService.statusCategory($rootScope.confHeader,category.id,category.status).then(function(success){
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