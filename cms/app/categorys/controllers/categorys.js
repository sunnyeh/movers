var myApp = angular.module('myApp');
myApp.controller('CategorysCtrl', ['$scope','$rootScope','$timeout','categoryService', function($scope,$rootScope,$timeout,categoryService) {
	$rootScope.pageTitle= "Categories";
    $rootScope.pageSubTitle = "Lists";
	$scope.loader=false;
    $scope.itemPerPage="10";


	$scope.getCategory = function(_page,_search){
		$scope.loader=true;
		$scope.categoryData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		categoryService.getCategory(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.categoryData = Data.data;
				$scope.categoryData.docs = $scope.categoryData.docs.map(function(item){
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
	$scope.getCategory(1);

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
						var index = $scope.categoryData.docs.indexOf(category);
		    			$scope.categoryData.docs.splice(index, 1);
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