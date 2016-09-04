var express = require('express');
const dgram = require('dgram');
var app = express();

const ABS_PORT = process.env.ABS_PORT;
const ABS_IP = process.env.ABS_IP;
const header = [0x04, 0x01, 0xdc, 0x4a, 0x01, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00];
const state = [0,0,0];
//const data = new Buffer.from(state.buffer);

app.set('view engine', 'pug');
app.set('port', (process.env.WEB_PORT || 3000));
app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist/'));
app.use(express.static('node_modules/bootstrap/dist/'));
app.use(express.static('node_modules/angular/'));

app.get('/v1/rand', function(req, res) {
  var i=0;
  var color = {
    'r': Math.floor((Math.random() * 255)),
    'g': Math.floor((Math.random() * 255)),
    'b': Math.floor((Math.random() * 255)),
  };
  while (i < state.length) {
    state[i++]=color.r;
    state[i++]=color.g;
    state[i++]=color.b;
  }
  send();
  res.send(JSON.stringify(color));
});

app.get('/v1/color', function(req, res) {
  //resp.send('color');
  var i=0;
  while (i < state.length) {
    state[i++]=req.query.r||0;
    state[i++]=req.query.g||0;
    state[i++]=req.query.b||0;
  }
  send();
  res.send(JSON.stringify(req.query));
});

app.get('/', function(req, res) {
  resp.render('home');
});

app.listen(app.get('port'), function() {
  console.log("Site is running on port " + app.get('port'));
});

function send() {
  var client = dgram.createSocket('udp4');
  var d = new Buffer.from(header.concat(state));  
  client.send(d, 0 , d.length, ABS_PORT, ABS_IP, function(err, bytes){
    if (err) throw err;
    client.close();
  });
};

// var SerialPort = require('../').SerialPort;
// var serial = new SerialPort();
 
// serial.on('data', function(data) {
//   console.log(data.toString());
// });
 
// serial.on('error', function(err) {
//   console.log(err);
// });
 
// serial.open('/dev/ttyUSB0', {
//   baudRate: 250000,
//   dataBits: 7,
//   parity: 'none',
//   stopBits: 2
// }, function(err) {
//   serial.write(data);
//   serial.close();
// });
