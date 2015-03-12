var socket = io.connect(),
// baseUrl = 'http://localhost:8080/mobile/#/tab/controls/',
baseUrl = 'https://socket-tetris.herokuapp.com/mobile/#/tab/controls/',
code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
$qrcode = $('#qrcode'),
$game = $('#game'),
started = false;

// Generate QR

var qrcode = new QRCode("qrcode", {
  text: baseUrl+code,
  width: 190,
  height: 190,
  colorDark : "#000000",
  colorLight : "#ffffff",
  correctLevel : QRCode.CorrectLevel.H
});

$game.hide();

socket.emit('join',{code: code});

var onGameOver = function(score){
  if(started){
    socket.emit('gameover',{score: score});
    started = false;
  }
};

socket.on('sync', function(){
    
    if($qrcode.is(':visible')){
        $qrcode.hide();
        $game.show();
    }
    
    if(!started){
        $game.blockrain({
          socket: socket,
          onGameOver: onGameOver,
          playText: '',
          gameOverText: '',
           restartButtonText: '',
        });
        Reveal.prev();
        Reveal.next();
        started = true;
    }

    $game.blockrain('start');
    
});

socket.on('end', function(){
    $game.blockrain('gameover');
});

socket.on('mobile disconnect', function(){
    if(started){
        $game.blockrain('gameover');
    }
    if($game.is(':visible')){
        $game.hide();
        $qrcode.show();
    }
});