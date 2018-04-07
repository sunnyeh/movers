var myApp = angular.module('myApp');
myApp.controller('SlidersCtrl', ['$scope','$rootScope','$timeout','sliderService', function($scope,$rootScope,$timeout,sliderService) {
	$rootScope.pageTitle= "Slider";
    $rootScope.pageSubTitle = "Lists";
	var getSlider = function(){
		$scope.loader=true;
		sliderService.getSlider($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.sliderData = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Slider",$scope.sliderData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
		$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getSlider();

	$scope.deleteSlider = function(slider){
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
				console.log(slider);
				sliderService.deleteSlider($rootScope.confHeader,slider.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.sliderData.indexOf(slider);
		    			$scope.sliderData.splice(index, 1);
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

	$scope.statusSlider = function(slider){
		$scope.loader=true;
		sliderService.statusSlider($rootScope.confHeader,slider.id,slider.status).then(function(success){
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