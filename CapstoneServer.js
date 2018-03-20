var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'capstone', //mysql database user name
  password : 'capstoneuottawa', //mysql database password
  database : 'Capstone', //mysql database name
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('You are now connected...')
})


//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "https://servercapstone.herokuapp.com/", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all results from a parking
app.get('/parkings', function (req, res) {
   connection.query('select * from parking', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
//rest api to get all results from a parkingSpot
app.get('/parkingSpots', function (req, res) {
   connection.query('select * from parkingSpots', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
//rest api to get all from a specific parking name
app.get('/parkings/:nom', function (req, res) {
   console.log(req);
   connection.query('select * from parking where nom=?', [req.params.nom], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
//rest api to get all from a specific parkingSpot name
app.get('/parkingSpots/:nomSpot', function (req, res) {
   console.log(req);
   connection.query('select * from parkingSpots where nomSpot=?', [req.params.nomSpot], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to create a new record into parking database
app.post('/parkings', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO parking SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to create a new record into parkingSpot database
app.post('/parkingSpots', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO parkingSpots SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to delete record from mysql database
app.delete('/parkings', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `parking` WHERE `nom`=?', [req.body.nom], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});
