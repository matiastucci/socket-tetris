var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);

var port  = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/desktop'));
app.use('/mobile', express.static(__dirname + '/public/mobile'));

io.on('connection', function (socket) {

  var code;

  socket.on('join', function (data) {
    code = data.code;
    socket.join(code);
    console.log("code: " + code);
  });

  socket.on('sync', function () {
    console.log('sync');
    socket.in(code).emit('sync');
  });
  
  socket.on('up', function () {
    console.log('up');
    socket.in(code).emit('up');
  });

  socket.on('right', function () {
    console.log('right');
    socket.in(code).emit('right');
  });

  socket.on('left', function () {
    console.log('left');
    socket.in(code).emit('left');
  });
  
  socket.on('down', function () {
    console.log('down');
    socket.in(code).emit('down');
  });
  
  socket.on('end', function () {
    console.log('end');
    socket.in(code).emit('end');
  });

  socket.on('gameover', function (data) {
    console.log('gameover');
    socket.in(code).emit('gameover',{score: data.score});
  });

  socket.on('disconnect', function () {
    socket.in(code).emit('mobile disconnect');
  });

});

server.listen(port, function(){
  console.log('listening on *:'+port);
});