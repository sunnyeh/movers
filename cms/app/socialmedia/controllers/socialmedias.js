var myApp = angular.module('myApp');
myApp.controller('SocialmediasCtrl', ['$scope','$rootScope','$timeout','socialmediaService', function($scope,$rootScope,$timeout,socialmediaService) {
   	$rootScope.pageTitle= "Social Media";
    $rootScope.pageSubTitle = "Lists";
	$scope.socialData=[];
   	$scope.itemPerPage="10";

	$scope.getSocialmedia = function(_page,_search){
		$scope.loader=true;
		$scope.socialData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		socialmediaService.getSocialmedia(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.socialData = Data.data;
				$scope.socialData.docs = $scope.socialData.docs.map(function(item){
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
	$scope.getSocialmedia(1);

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
						var index = $scope.socialData.docs.indexOf(socialmedia);
		    			$scope.socialData.docs.splice(index, 1);
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
		socialmediaService.statusSocialmedia($rootScope.confHeader,socialmedia.id,socialmedia.status).then(function(success){
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