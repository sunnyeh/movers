var myApp = angular.module('myApp');
myApp.controller('SocialmediasCtrl', ['$scope','$rootScope','$timeout','socialmediaService', function($scope,$rootScope,$timeout,socialmediaService) {
   	$rootScope.pageTitle= "Social Media";
    $rootScope.pageSubTitle = "Lists";
	$scope.socialData=[];
   	$scope.itemPerPage="10";
	var getSocialmedia = function(){
		$scope.loader=true;
		socialmediaService.getSocialmedia($rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.socialData = Data.data.map(function(item){
					// console.log("item",item);
					item.status=item.status.toString();
					return item;
				});
				console.log("Socialmedia",$scope.socialData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	getSocialmedia();

	$scope.deleteSocialmedia = function(socialmedia){
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
				console.log(socialmedia);
				socialmediaService.deleteSocialmedia($rootScope.confHeader,socialmedia.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.socialData.indexOf(socialmedia);
		    			$scope.socialData.splice(index, 1);
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

	$scope.statusSocialmedia = function(socialmedia){
		$scope.loader=true;
		socialmediaService.statusSlider($rootScope.confHeader,socialmedia.id,socialmedia.status).then(function(success){
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