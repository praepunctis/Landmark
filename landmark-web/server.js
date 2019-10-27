var express = require('express');
var app = express();
var path = require('path');
var Cockroach = require('./db/Cockroach')

// viewed at http://localhost:8080
// WEBSITE DISPLAY STUFF
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

app.post('/submit', function(req, res) {
   var d = req.body
  //  res.send(d)
   console.log(d)
   Cockroach.push_landmark(d["latitude"], d["longitude"], d["name"], d["description"], d["image"], d["n_ratings"], d["rating"], d["type"])
   res.send("yes!");
});

app.get('/points', function(req,res) {
  res.send(Cockroach.pull_landmarks())
});


app.listen(8080);
