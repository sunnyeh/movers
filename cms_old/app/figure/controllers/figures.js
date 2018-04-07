var myApp = angular.module('myApp');
myApp.controller('FiguresCtrl', ['$scope','$rootScope','$timeout','figureService', function($scope,$rootScope,$timeout,figureService) {
	$rootScope.pageTitle= "Figure";
    $rootScope.pageSubTitle = "Lists";
	$scope.loader=false;
   	$scope.itemPerPage="10";
	var getFigure = function(){
		$scope.loader=true;
		figureService.getFigure($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.figureData = Data.data.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Figure",$scope.figureData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getFigure();

	$scope.deleteFigure = function(figure){
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
				console.log(figure);
				figureService.deleteFigure($rootScope.confHeader,figure.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.figureData.indexOf(figure);
		    			$scope.figureData.splice(index, 1);
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

	$scope.statusAddress = function(address){
		$scope.loader=true;
		addressService.statusAddress($rootScope.confHeader,address.id,address.status).then(function(success){
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