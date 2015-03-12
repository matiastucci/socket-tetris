# Socket Tetris

Control a Tetris [(Blockrain.js)](https://github.com/Aerolab/blockrain.js) using node.js and [Socket.IO](http://socket.io).

**[Check out the demo](http://www.keepe.rs/projects/socket-tetris)

NOTE: Running it in your computer it's a better experience, because in Heroku it has 1sg (aprox) of delay.

## How to use

```
$ git clone https://github.com/matiastucci/socket-tetris
$ cd socket-tetris
$ npm install
$ node server.js
```

Next, you have to change the `baseUrl` variable in `socket-tetris/public/desktop/js/app.js` and `socket-tetris/public/mobile/js/services.js` with your IP address if you want to access this from your smartphone.

Then, point your browser to `http://localhost:8080`

## Libraries in use
### Desktop

* [Blockrain.js](https://github.com/Aerolab/blockrain.js)
* [reveal.js](http://lab.hakim.se/reveal-js)
* [QRCode.js](http://davidshimjs.github.io/qrcodejs)
* [Socket.IO](http://socket.io)

### Mobile

* [Ionic](http://ionicframework.com)
* [angular-socket-io](https://github.com/btford/angular-socket-io)
