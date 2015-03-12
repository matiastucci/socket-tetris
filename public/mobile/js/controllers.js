angular.module('tetris.controllers', [])

.controller('ControlsCtrl', function($scope,$ionicGesture,$stateParams,Tetris,Controls,mySocket) {
  
  var dragZone = angular.element( document.querySelector( '#drag-zone' ) );
  
  if($stateParams.code){
    var code = $stateParams.code;
    Tetris.setCode(code);
  }
  
  $scope.data = {};
  if(Tetris.getStart()){
    $scope.data.showStartButton = false;
  }else{
    $scope.data.showStartButton = true;
  }
  
  if(Controls.getType() == 'sw'){
    $scope.data.showDragZone = true;
  }else{
    $scope.data.showDragZone = false;
  }
  
  $scope.start = function(){
    $scope.data.showStartButton = false;
    Tetris.sync();
  }
  
  $scope.end = function(){
    $scope.data.showStartButton = true;
    Tetris.end();
  }
  
  // Arrow controls

  $scope.up = function(){
    Tetris.up();
  };
  
  $scope.right = function(){
    Tetris.right();
  };
  
  $scope.left = function(){
    Tetris.left();
  };
  
  $scope.down = function(){
    Tetris.down();
  };

  // Swipe controls
  
  $ionicGesture.on(
    'swipeup',
    function(){
      console.log('swipeup');
      $scope.up();
    },
    dragZone,
    { drag_lock_to_axis: true }
  );
  
  $ionicGesture.on(
    'swiperight',
    function(){
      console.log('swiperight');
      $scope.right();
    },
    dragZone,
    { drag_lock_to_axis: true }
  );
  
  $ionicGesture.on(
    'swipeleft',
    function(){
      console.log('swipeleft');
      $scope.left();
    },
    dragZone,
    { drag_lock_to_axis: true }
  );
  
  $ionicGesture.on(
    'swipedown',
    function(){
      console.log('swipedown');
      $scope.down();
    },
    dragZone,
    { drag_lock_to_axis: true }
  );

  // Reset when gameover

  mySocket.on('gameover', function(data){
    $scope.end();
    console.log('Score: ' + data.score);
  });
  
})

.controller('SettingsCtrl', function($scope,$state,Tetris,Controls) {
  
  $scope.data = {
    type: 'bt'
  };
  
  $scope.types = Controls.getTypes();
  
  $scope.setType = function(type){
    Controls.setType(type);
    $state.go('tab.controls',{code: Tetris.getCode()});
  }
  
})

.controller('InfoCtrl', function() {

});
