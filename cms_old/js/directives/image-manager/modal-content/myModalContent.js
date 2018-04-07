angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, $uibModal, $log, $rootScope, $scope, imageService, $location,Global) {
  // console.log("model componet");
  $scope.items = [];
  $scope.oldItems = [];
  // console.log($scope.items);
  $scope.imgLoader=true;
  $scope.selected = {};
  $scope.directory = {};
  $scope.backItems = [];
  $scope.createDirPath = '';

  $scope.referashImg = function(){
    $scope.imgLoader=true;
    $scope.items = [];
    $scope.oldItems = [];
    $scope.selected = {};
    $scope.directory = {};
    $scope.backItems = [];
    $scope.createDirPath = '';

    imageService.getFile(null, $rootScope.confHeader).then(function(sucess){
      var imageData = sucess.data;
      if(imageData.status){
        $scope.createDirPath = '';
        $scope.items = pathSetting(imageData.data,Global.media_path);
        $scope.backItems = navidata(angular.copy($scope.items));
        console.log("items : ",$scope.items);
        angular.copy($scope.items, $scope.oldItems);
      } else {
        console.log(imageData.message);
      }
      $scope.imgLoader=false;
    },function(err){
      console.log(err);
    });
  }   
  $scope.referashImg();

  function pathSetting(data,paths,files){
    files = [];
    var images = data;
    for(var i in images){
      if(images[i].directory){
        images[i].dir = images[i].name.split("/");
        console.log(images[i].name);
        images[i].name = images[i].dir[images[i].dir.length-1];
        images[i].url = Global.folder_img;
        images[i].deleteF = false;
        files.push(images[i]);
        // files[files.length-1].images = [];
        pathSetting(images[i].images,paths,files[files.length-1].images);
      } else {
        console.log("images[i].url after : ",images[i].url);
        if(images[i].url){
        console.log("images[i].url before : ",images[i].url);
          var name = images[i].url.split("/");
          images[i].name = name[name.length-1];
          images[i].url = paths + images[i].url;
          // console.log(images[i].url);
          images[i].deleteF = false;
          files.push(images[i]);
        }
      }
    }
    return files;
  }

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.url);
  };

  $scope.clickNav = function(name, naviItems){
    console.log("name : ",name);
    console.log("nav : ",naviItems);
    if(name == 'Root'){
      $scope.createDirPath = '';
      $scope.directory = [];
      $scope.items = $scope.oldItems;
    } else {
      for(var i in naviItems){
        if(naviItems[i].directory && name == naviItems[i].name){
          console.log("after : ",naviItems[i].name, name,i)
          $scope.directory = naviItems[i].dir;
          $scope.createDirPath = naviItems[i].dir.join("/");
          $scope.items = naviItems[i].images;
          console.log("create : ",$scope.createDirPath);
        }
      }
    }
  }

  $scope.clickImage = function (item) {
    if(item.directory){
        $scope.directory = item.dir;
        $scope.createDirPath = item.dir.join("/");
        // console.log($scope.createDirPath);
        $scope.items = item.images;
    } else {
        $scope.selected = item;
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.createDirectory = function (paths) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      backdrop : 'static',
      templateUrl: 'js/directives/image-manager/create-directory/create-directory.html',
      controller: 'CreateDirctoryCtrl',
      size: 'sm',
      resolve: {
        loadMyFiles:function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'myApp',
            files:[
            'js/directives/image-manager/create-directory/create-directory.js'
            ]
          })
        },
        paths: function () {
          return paths;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.items = [];
      $scope.oldItems = [];
      $scope.selected = {};
      $scope.directory = {};
      $scope.backItems = [];
      $scope.createDirPath = '';

      $scope.createDirPath = selectedItem.paths;
      $scope.directory = selectedItem.paths.split("/");
      // console.log($scope.directory)
      $scope.items = pathSetting(selectedItem.items,Global.media_path);
      angular.copy($scope.items, $scope.oldItems);
      $scope.backItems = navidata(angular.copy($scope.items));
      $scope.clickNav($scope.directory[$scope.directory.length-1],$scope.backItems);
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  $scope.uploadImage = function (paths) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      backdrop : 'static',
      templateUrl: 'js/directives/image-manager/upload-image/upload-image.html',
      controller: 'UploadImageCtrl',
      size: 'sm',
      resolve: {
        loadMyFiles:function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'myApp',
            files:[
            'js/directives/image-manager/upload-image/upload-image.js'
            ]
          });
        },
        paths: function () {
          return paths;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.items = [];
      $scope.oldItems = [];
      $scope.selected = {};
      $scope.directory = {};
      $scope.backItems = [];
      $scope.createDirPath = '';

      $scope.createDirPath = selectedItem.paths;
      $scope.directory = selectedItem.paths.split("/");
      // console.log($scope.directory)
      $scope.items = pathSetting(selectedItem.items,Global.media_path);
      angular.copy($scope.items, $scope.oldItems);
      $scope.backItems = navidata(angular.copy($scope.items));
      $scope.clickNav($scope.directory[$scope.directory.length-1],$scope.backItems);
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  $scope.deleteImg = function (currentPath,deleteItem) {
    // console.log(currentPath);
    // console.log(deleteItem);
    var deleteFiles=[];
    for(var i in deleteItem){
      if(deleteItem[i].deleteF){
        deleteFiles.push(currentPath+'/'+deleteItem[i].name);
      }
    }
    // console.log(deleteFiles);
    var formdata = new FormData();
    formdata.append( 'deleteFiles', deleteFiles);

    imageService.deleteFileDirectory(currentPath,formdata, $rootScope.confHeader).then(function(sucess){
      var imageData = sucess.data;
      if(imageData.status){

        $scope.items = [];
        $scope.oldItems = [];
        $scope.selected = {};
        $scope.directory = {};
        $scope.backItems = [];
        $scope.createDirPath = '';

        $scope.createDirPath = currentPath;
        $scope.directory = currentPath.split("/");
        // console.log($scope.directory)
        $scope.items = pathSetting(imageData.data,Global.media_path);
        angular.copy($scope.items, $scope.oldItems);
        $scope.backItems = navidata(angular.copy($scope.items));
        $scope.clickNav($scope.directory[$scope.directory.length-1],$scope.backItems);
        swal("Success", imageData.message, "success");
      } else {
        console.log(imageData.message);
      }
    },function(err){
      console.log(err);
    });
  };

  function navidata(data,files){
    files = files || [];
    var images = data;
    for(var i in images){
      if(images[i].directory){
        files.push(images[i]);
        navidata(images[i].images,files);
      } else {
        files.push(images[i]);
      }
    }
    return files;
  }

});