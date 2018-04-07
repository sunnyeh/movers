angular.module('myApp').controller('UploadImageCtrl', function ( $uibModalInstance, paths, $rootScope, $scope, imageService, $location) {
  // console.log("upload image componet");
  $scope.passData={};
  // console.log(paths);
  $scope.imageFile=[];  
  $scope.loading=false;
    

  $scope.clickUpload = function(){
      angular.element('#imageUpload').trigger('click');
  };

  $scope.onFilesSelected = function($files) {
     // console.log("files - " , files);
      $scope.imageFile=[];
      $scope.imageFile.photo ='';
      $scope.imageFile.file = $files[0];
      $scope.imageFile.fileName = $scope.imageFile.file.name;
      var reader = new FileReader();
      reader.readAsDataURL($scope.imageFile.file);
      reader.onloadend = function ()
      {
        var img_data = reader.result;
        var spl_dt = img_data.split(',');
        $scope.imageFile.photo ='data:image/png;base64,' + spl_dt[1];
        $scope.$apply();
      }
      // console.log($scope.imageFile)
      return $scope.imageFile;
  };

  

  $scope.ok = function () {
      // console.log($scope.imageFile);
    $scope.loading=true;
    
    if(angular.isUndefined($scope.imageFile.photo) || $scope.imageFile.photo == null || $scope.imageFile.photo == "")
    {
        $rootScope.callError('Please select the image');
        return;      
    }

    var formdata = new FormData();
    formdata.append( 'file', $scope.imageFile.file);

    imageService.uploadFile(paths,formdata, $rootScope.confHeader).then(function(sucess){
      var imageData = sucess.data;
      // console.log(imageData);
      if(imageData.status){
        $scope.loading=false;
        $scope.passData.items = imageData.data;
        $scope.passData.paths = paths;
        swal("Success", imageData.message, "success");
        $uibModalInstance.close($scope.passData);
      } else {
        // console.log(imageData.message);
      }
    },function(err){
      console.log(err);
    });
    
  };

  
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  
  
}).directive('onFileChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.onFileChange);

      element.bind('change', function() {
        scope.$apply(function() {
          var files = element[0].files;
          if (files) {
            onChangeHandler(files);
          }
        });
      });

    }
  };
});