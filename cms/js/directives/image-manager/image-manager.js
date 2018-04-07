'use strict';
angular.module('myApp')
    .directive('imageManager',function() {
    	return {
  		templateUrl:'js/directives/image-manager/image-manager.html',
  		restrict:'E',
      replace:true,
      scope: {
        'imageFile': '=',
        'imageNo' : '='
      },
      controller: function($uibModal, $scope, $rootScope, $log, imageService,$location){
   
        // $scope.items = ['item1', 'item2', 'item3'];
        $scope.openImageModal = function(){
            
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              backdrop : 'static',
              templateUrl: 'js/directives/image-manager/modal-content/myModalContent.html',
              controller: 'ModalInstanceCtrl',
              size: 'lg',
              resolve: {
                loadMyFiles:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name:'myApp',
                    files:[
                    'js/directives/image-manager/modal-content/myModalContent.js'
                    ]
                  })
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.imageFile = selectedItem;
              // console.log(selectedItem)
            }, function () {
              $log.info('modal-component dismissed at: ' + new Date());
            });
        }

      }
  		
  	}
  });
