angular.module('myApp').controller('CreateDirctoryCtrl', function ( $uibModalInstance, paths, $rootScope, $scope, imageService, $location) {
  // console.log("create directry componet");
  $scope.name='';
  $scope.passData={};
  // console.log(paths);
        
    

  

  $scope.ok = function () {
    if(angular.isUndefined($scope.name) || $scope.name == null || $scope.name == "")
    {
        $rootScope.callError('Please enter the directory name');
        return;      
    }

    var formdata = new FormData();
    formdata.append( 'name', $scope.name);

    imageService.createDirectory(paths,formdata, $rootScope.confHeader).then(function(sucess){
      var imageData = sucess.data;
      if(imageData.status){
        $scope.passData.items = imageData.data;
        $scope.passData.paths = paths;
        swal("Success", imageData.message, "success");
        $uibModalInstance.close($scope.passData);
      } else {
        console.log(imageData.message);
      }
    },function(err){
      console.log(err);
    });
    
  };

  
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  
  
});