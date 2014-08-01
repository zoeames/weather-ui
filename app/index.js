'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res){
  res.render('home');
});

app.post('/', function (req, res){
  var zip = req.body.zip;
  var url = 'http://api.wunderground.com/api/536b90dc843299c1/conditions/q/' + zip + '.json';
  var temp;
  request( url, function( error, response, body){
    body = JSON.parse(body);
    temp = body.current_observation.temp_f;

    console.log(temp);
    var tempColor;
    temp = parseInt(temp);
    if (temp < 32){ 
      tempColor = 'blue';
    }else if(temp < 70 ){ 
      tempColor = 'green';
    }else if(temp < 80){
      tempColor = 'yellow';
    }else if(temp < 95){
      tempColor = 'orange';
    }else {tempColor = 'red';
    }
    
    res.render('weather', {temp:temp, zip:zip, tempColor:tempColor} );
  });
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT', port + '...');
});
