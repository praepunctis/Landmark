var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/font-awesome-4.7.0/css/font-awesome.css',function(req,res){
  res.sendFile(path.join(__dirname + '/font-awesome-4.7.0/css/font-awesome.css')); 
});

app.get('/src/css/main.css',function(req,res){
  res.sendFile(path.join(__dirname + '/src/css/main.css')); 
});

app.get('/src/js/Mapbox.js',function(req,res){
  res.sendFile(path.join(__dirname + '/src/js/Mapbox.js')); 
});

// app.get('/src/js/Cockroach.js',function(req,res){
//   res.sendFile(path.join(__dirname + '/src/js/Cockroach.js')); 
// });

app.listen(8080);
