var myApp = angular.module('myApp');
myApp.controller('TestimonysCtrl', ['$scope','$rootScope','$timeout','testimonyService', function($scope,$rootScope,$timeout,testimonyService) {
    $rootScope.pageTitle= "Testimonials";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";
	
	$scope.getTestimony = function(_page,_search){
		$scope.loader=true;
		$scope.testimonyData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		testimonyService.getTestimony(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.testimonyData = Data.data;
				$scope.testimonyData.docs = $scope.testimonyData.docs.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Testimony",$scope.testimonyData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	$scope.getTestimony(1);

	$scope.deleteTestimony = function(testimony){
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
				console.log(testimony);
				testimonyService.deleteTestimony($rootScope.confHeader,testimony.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.testimonyData.docs.indexOf(testimony);
		    			$scope.testimonyData.docs.splice(index, 1);
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
			    swal("Cancelled", "Your imaginary file is safe", "error");
				$scope.loader=false;
			}
		});
	}

	$scope.statusTestimony = function(testimony){
		$scope.loader=true;
		testimonyService.statusTestimony($rootScope.confHeader,testimony.id,testimony.status).then(function(success){
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