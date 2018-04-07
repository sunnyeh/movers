var myApp = angular.module('myApp');
myApp.controller('MoverslistesCtrl', ['$scope','$rootScope','$timeout','moverslistService', function($scope,$rootScope,$timeout,moverslistService) {
    $rootScope.pageTitle= "Moverslist";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";

	$scope.getMoverslist = function(_page,_search){
		$scope.loader=true;
		$scope.moverslistData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		moverslistService.getMoverslist(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.moverslistData = Data.data;
				$scope.moverslistData.docs = $scope.moverslistData.docs.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Moverslist",$scope.moverslistData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	$scope.getMoverslist(1);

	$scope.deleteMoverslist = function(moverslist){
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
				console.log(moverslist);
				moverslistService.deleteMoverslist($rootScope.confHeader,moverslist.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.moverslistData.docs.indexOf(moverslist);
		    			$scope.moverslistData.docs.splice(index, 1);
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

	$scope.statusMoverslist = function(moverslist){
		$scope.loader=true;
		moverslistService.statusMoverslist($rootScope.confHeader,moverslist.id,moverslist.status).then(function(success){
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