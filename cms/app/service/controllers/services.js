var myApp = angular.module('myApp');
myApp.controller('ServicesCtrl', ['$scope','$rootScope','$timeout','servicesService', function($scope,$rootScope,$timeout,servicesService) {
    $rootScope.pageTitle= "Service";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";
	// var getService = function(){
	// 	$scope.loader=true;
	// 	servicesService.getService($rootScope.confHeader).then(function(success){
	// 		console.log("success",success);
	// 		var Data = success.data;
	// 		if(Data.status){
	// 			$scope.serviceData = Data.data.map(function(item){
	// 				item.status=item.status.toString();
	// 				return item;
	// 			});
	// 		} else {
	// 			$rootScope.alertMessage(Data.message,'error');
	// 		}
	// 	$scope.loader=false;
	// 	},function(error){
	// 		$rootScope.alertMessage(error,'error');
	// 		$scope.loader=false;
	// 	})
	// }
	// getService();
	$scope.getService = function(_page,_search){
		$scope.loader=true;
		$scope.serviceData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		servicesService.getService(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.serviceData = Data.data;
				$scope.serviceData.docs = $scope.serviceData.docs.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Service",$scope.serviceData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	$scope.getService(1);

	$scope.deleteService = function(service){
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
				console.log(service);
				servicesService.deleteService($rootScope.confHeader,service.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.serviceData.docs.indexOf(service);
		    			$scope.serviceData.docs.splice(index, 1);
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

	$scope.statusService = function(service){
		$scope.loader=true;
		servicesService.statusService($rootScope.confHeader,service.id,service.status).then(function(success){
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