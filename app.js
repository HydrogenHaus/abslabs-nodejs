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
const server = dgram.createSocket('udp4');
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

// server.on('error', (err) => {
//   console.log(`server error:\n${err.stack}`);
//   server.close();
// });
// server.on('message', (msg, rinfo) => {
// 	const m = msg.toString();
//   console.log(`message: ${m}`);
// });
// server.on('listening', () => {
//   var address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });
// server.bind({
//   address: 'localhost',
//   port: PORT,
//   exclusive: true
// });

//const header = [0x4A, 0xDC, 0x01, 0x04, 0x00, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0xFF, 0xFF, 0xFF];
//const d = [0x4adc0104, 0x0001, 0x0101, 0x00000000, 0x00, 0x00, 0x0000, 0xFFFFFFFF, 0x00, 0xFFFFFF]
//const s = '\x04\x01\xdcJ\x01\x00\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\xff\xff\xff\xff\x00\xff\xff\xff';
const s = [0x04, 0x01, 0xdc, 0x4a, 0x01, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0x00];
//const test = 0x4adc0104 0x00010101 0x00000000 0x000000 0xffffffff 0x00 0xffffff;
//const test = 0x4adc01040001010100000000000000ffffffff00ffffff;
var d = new Buffer(s.concat([2,132,130]));
console.log(d + d.length);

var client = dgram.createSocket('udp4');
client.send(d, 0 , d.byteLength, PORT, BOX, function(err, bytes){
// client.send(data, 0, data.length, PORT, BOX, function(err, bytes) {
    if (err) throw err;
    console.log('UDP data sent to ' + BOX +':'+ PORT);
    client.close();
});
