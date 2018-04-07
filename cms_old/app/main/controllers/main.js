var myApp = angular.module('myApp');
myApp.controller('GlobalCtrl', ['$scope', '$rootScope','$anchorScroll','$interval','$location','mainService', function($scope, $rootScope, $anchorScroll,$interval,$location,mainService) {
  	$("body").addClass("skin-blue sidebar-mini");
    $("body").removeClass("login-page");
  	$scope.messages=[];
    $rootScope.pageTitle= "";
    $rootScope.pageSubTitle = "";
    $rootScope.mailExp= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    $rootScope.numExp=/^[0-9]+$/;

    var token = localStorage.getItem("Token") || '';
    $rootScope.userData = (localStorage.getItem("Userdata"))?JSON.parse(localStorage.getItem("Userdata")):{};
    console.log(token,$rootScope.userData)
    $rootScope.confHeader={};
    if(token){
      $rootScope.confHeader = {
        'Content-Type':undefined,
        'Authorization':'bearer '+token
      }
    } else {
      $location.path('/login');
    }
    $scope.checkToken=function(){
      mainService.getCheckToken($rootScope.confHeader).then(function(success){
        var Data = success.data;
        // console.log("data : ",Data);
        if(!Data.status){
          localStorage.setItem("Token",'');
          localStorage.setItem("Userdata",'');
          token = '';
          $rootScope.userData = {};
          $location.path('/login');
          $rootScope.alertMessage(Data.message,'error');
        } 
      },function(error){
        $rootScope.alertMessage(error,'error');
      })
    }
    $scope.checkToken();

    $rootScope.back = function () {
        window.history.back();
    };

    $rootScope.refresh = function () {
        window.location.reload();
    };

    $rootScope.slug=function(str){
        var $slug = '';
        var trimmed = $.trim(str);
        $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
        replace(/-+/g, '-').
        replace(/^-|-$/g, '');
        return $slug.toLowerCase();
    }
    $scope.AlertTimer = null;
    $rootScope.alertMessage=function(msg,type){
      $anchorScroll();
      switch(type){
        case 'error':{
          $scope.messages.push({type:'danger',icon:'fa-ban',title:'Error!',message:msg})-1;
          break;
        }
        case 'success':{
          $scope.messages.push({type:'success',icon:'fa-check',title:'Success!',message:msg})-1;
          break;
        }
        default:{
          $scope.messages.push({type:'warning',icon:'fa-warning',title:'Alert!',message:msg})-1;
        }
      }
      if($scope.AlertTimer==null) {
        console.log("init")
        $scope.AlertTimer = $interval(function() {
          if ($scope.messages.length > 0){
            console.log("remove")
            $scope.messages.shift();
          } else {
            console.log("stop")
            $interval.cancel($scope.AlertTimer);
            $scope.AlertTimer=null;
          }
        }, 10000);
      }
    }

    $rootScope.dateOptions={}

    $scope.ChangePasswordModal = function(){
            
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          backdrop : 'static',
          templateUrl: 'js/directives/change-password/change.html',
          controller: 'ChangePasswordCtrl',
          size: 'sm',
          resolve: {
            loadMyFiles:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name:'myApp',
                files:[
                'js/directives/change-password/change.js'
                ]
              })
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $rootScope.alertMessage(selectedItem.message,'success');
          console.log("selected : ",selectedItem)
        }, function () {
          console.log('modal-component dismissed at: ' + new Date());
        });
    }

    $scope.logout=function(){
      mainService.getLogout($rootScope.confHeader).then(function(success){
        var Data = success.data;
        if(Data.status){
          localStorage.setItem("Token",'');
          localStorage.setItem("Userdata",'');
          token = '';
          $rootScope.userData = {};
          $location.path('/login');
        } else {
          $rootScope.alertMessage(Data.message,'error');
        }
      },function(error){
        $rootScope.alertMessage(error,'error');
      })
    }
}]);  