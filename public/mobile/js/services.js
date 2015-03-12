angular.module('tetris.services', [])

.factory('mySocket', function (socketFactory) {
  
  var baseUrl = 'http://localhost:8080';
  var myIoSocket = io.connect(baseUrl);

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})

.factory('Controls', function() {
  
  var types = [
    { text: "Buttons", value: "bt" },
    { text: "Swipe", value: "sw" }
  ];
  
  var type = types[0].value;

  return {
    getTypes: function(){
      return types;
    },
    getType: function(){
      return type;
    },
    setType: function(newType){
      type = newType;
    }
  }
  
})

.factory('Tetris', function(mySocket) {
  
  var code = null;
  var started = false;

  return {
    getStart: function(){
      return started;
    },
    getCode: function(){
      return code;
    },
    setCode: function(newCode){
      mySocket.emit('join',{code: newCode});
      code = newCode;
    },
    sync: function(){
      mySocket.emit('sync');
      started = true;
    },
    up: function() {
      mySocket.emit('up');
    },
    right: function() {
      mySocket.emit('right');
    },
    left: function() {
      mySocket.emit('left');
    },
    down: function() {
      mySocket.emit('down');
    },
    end: function(){
      mySocket.emit('end');
      started = false;
    }
  }
  
});
