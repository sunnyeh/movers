var myApp = angular.module('myApp');
myApp.controller('AddressesCtrl', ['$scope','$rootScope','$timeout','addressService', function($scope,$rootScope,$timeout,addressService) {
    $rootScope.pageTitle= "Address";
    $rootScope.pageSubTitle = "Lists";
	$scope.itemPerPage="10";

	$scope.getAddress = function(_page,_search){
		$scope.loader=true;
		$scope.addressData={docs:[]};
		var search = '?';
		if(_search){
			search += (!(angular.isUndefined(_search.name) || _search.name == null || _search.name == ""))?('name='+_search.name+'&'):'';
		}
		search += (!(angular.isUndefined(_page) || _page == null || _page == ""))?('page='+_page+'&'):'';
		console.log("search : ", search)
		addressService.getAddress(search,$rootScope.confHeader).then(function(success){
			console.log("success",success);
			var Data = success.data;
			if(Data.status){
				$scope.addressData = Data.data;
				$scope.addressData.docs = $scope.addressData.docs.map(function(item){
					item.status=item.status.toString();
					return item;
				});
				console.log("Address",$scope.addressData);
			} else {
				$rootScope.alertMessage(Data.message,'error');
			}
			$scope.loader=false;
		},function(error){
			$rootScope.alertMessage(error,'error');
			$scope.loader=false;
		})
	}
	$scope.getAddress(1);

	$scope.deleteAddress = function(address){
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
				console.log(address);
				addressService.deleteAddress($rootScope.confHeader,address.id).then(function(success){
					console.log("success",success);
					var Data = success.data;
					if(Data.status){
						var index = $scope.addressData.docs.indexOf(address);
		    			$scope.addressData.docs.splice(index, 1);
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