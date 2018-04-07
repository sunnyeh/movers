var myApp = angular.module('myApp');
myApp.controller('SlidersCtrl', ['$scope','$rootScope','$timeout','sliderService', function($scope,$rootScope,$timeout,sliderService) {
	$rootScope.pageTitle= "Slider";
    $rootScope.pageSubTitle = "Lists";
	$scope.sliderData=[];
   	$scope.itemPerPage="10";
   	
	$scope.getSlider = function(_page,_search){
		$scope.loader=true;
		$scope.sliderData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		sliderService.getSlider(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.sliderData = Data.data;
				$scope.sliderData.docs = $scope.sliderData.docs.map(function(item){
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
	$scope.getSlider(1);

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
						var index = $scope.sliderData.docs.indexOf(slider);
		    			$scope.sliderData.docs.splice(index, 1);
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