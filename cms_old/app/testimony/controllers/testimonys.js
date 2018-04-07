var myApp = angular.module('myApp');
myApp.controller('TestimonysCtrl', ['$scope','$rootScope','$timeout','testimonyService', function($scope,$rootScope,$timeout,testimonyService) {
    $rootScope.pageTitle= "Testimonials";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";
	var getTestimony = function(){
		$scope.loader=true;
		testimonyService.getTestimony($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.testimonyData = Data.data.map(function(item){
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
	getTestimony();

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
						var index = $scope.testimonyData.indexOf(testimony);
		    			$scope.testimonyData.splice(index, 1);
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