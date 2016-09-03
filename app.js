// var express = require('express');
// var app = express();

// app.set('view engine', 'jade');
// app.set('port', (process.env.PORT || 3000));
// app.use(express.static('public'));
// app.use(express.static('node_modules/jquery/dist/'));
// app.use(express.static('node_modules/bootstrap/dist/'));
//app.use(express.static('node_modules/angular/'));

// app.get('/', function(request, response) {
//   response.render('home');
// });

// app.get('/v1/color', function(request, response) {
//   response.send('color');
// });

// app.listen(app.get('port'), function() {
//   console.log("Site is running on port " + app.get('port'));
// });

const PORT = 6038;
const BOX = '10.1.1.210';
const state = new Uint8Array(510);
const data = new Buffer.from(state.buffer);
const dgram = require('dgram');
var SerialPort = require('../').SerialPort;
var serial = new SerialPort();
 
serial.on('data', function(data) {
  console.log(data.toString());
});
 
serial.on('error', function(err) {
  console.log(err);
});
 
serial.open('ttyUSB0', {
  baudRate: 250000,
  dataBits: 7,
  parity: 'none',
  stopBits: 2
}, function(err) {
  serial.write(data);
  serial.close();
});

// var client = dgram.createSocket('udp4');
// client.send(data, 0, data.length, PORT, BOX, function(err, bytes) {
//     if (err) throw err;
//     console.log('UDP data sent to ' + BOX +':'+ PORT);
//     client.close();
// });
