var myApp = angular.module('myApp');
myApp.controller('ServicesCtrl', ['$scope','$rootScope','$timeout','servicesService', function($scope,$rootScope,$timeout,servicesService) {
    $rootScope.pageTitle= "Service";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";
	var getService = function(){
		$scope.loader=true;
		servicesService.getService($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.serviceData = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getService();

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
						var index = $scope.serviceData.indexOf(service);
		    			$scope.serviceData.splice(index, 1);
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