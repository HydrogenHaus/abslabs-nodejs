var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist/'));
app.use(express.static('node_modules/bootstrap/dist/'));
//app.use(express.static('node_modules/angular/'));

app.get('/', function(request, response) {
  response.render('home');
});

app.get('/v1/color', function(request, response) {
  response.send('color');
});

app.listen(app.get('port'), function() {
  console.log("Site is running on port " + app.get('port'));
});
