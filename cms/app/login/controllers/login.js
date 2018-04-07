var myApp = angular.module('myApp');
myApp.controller('LoginCtrl', ['$scope','loginService','$rootScope','$anchorScroll','$timeout','$location', function($scope,loginService,$rootScope,$anchorScroll,$timeout,$location) {
	var mailExp= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
	$("body").removeClass("skin-blue sidebar-mini");
    $("body").addClass("login-page");
    $scope.loginBtn="Login";
    $scope.message={message:''};

    $scope.login = function(){
	    if(angular.isUndefined($scope.email) || $scope.email == null || $scope.email == "")
	    {
		     $scope.callError('Please select the email',"error");
		     return;      
	    }
	    else
	    {
	    	if(mailExp.test($scope.email))
		    {
		        
		    }
		    else{
		    	$scope.callError('Notification email address not valid',"error");
		        return;
		    }
	    }
	    if(angular.isUndefined($scope.password) || $scope.password == null || $scope.password == "")
	    {
	      $scope.callError("Please enter your password");
	      return;      
	    } 
      	var formdata = new FormData();
      		formdata.append( 'email', $scope.email);
      		formdata.append( 'password', $scope.password);

      	var headers= {'Content-Type': undefined};
	    $scope.loginBtn="Loading...";
  		loginService.postLogin(formdata,headers).
        then(function(success) {
            var Data = success.data
            if(Data.status)
            {
              $scope.callSuccess(Data.message);
              localStorage.setItem("Token", Data.token);
              localStorage.setItem("Userdata", JSON.stringify(Data.data));
              var temPath = localStorage.getItem("previewUrl");
              localStorage.setItem("previewUrl", '');
              console.log(Data)
              $location.path((temPath && temPath!='/app/404')?temPath:'/app/dashboard');
              // window.location="#!/app/dashboard";
            }
            else
            {
              $scope.callError(Data.message);
              $scope.loginBtn="Login";
            }
            
        },function(error) {
            console.log(error);
            $scope.loginBtn="Login";
        });
  		
  	}

    $scope.callError=function(message){
      $anchorScroll();
      $scope.message={
        type:'danger',
        icon:'fa-ban',
        title:'Alert',
        message:message
      }
      $timeout( function(){
          $scope.message = {message:''};
      }, 5000 );
    }
    $scope.callSuccess=function(message){
      $anchorScroll();
      $scope.message={
        type:'success',
        icon:'fa-check',
        title:'Success',
        message:message
      }
      $timeout( function(){
          $scope.message = {message:''};
      }, 5000 );

    }

}]);