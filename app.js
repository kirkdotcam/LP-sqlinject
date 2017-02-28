var mysql = require('mysql');
var express = require('express');
var path = require('path');
var key = require('./keys.js')
var app = express();

app.use(express.static('public'))

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: key.pw,
  database: "injection_db",
  //This is the first red flag. Allowing a user to make multiple statments will allow them to place a semicolon at the end of any form field and inject a new query.
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {throw err};
});

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname, "public/html/view.html"));


});

app.get('/query/',function(req,res){
  var uid=req.query.ID;
  var pass=req.query.pass;

  //below we create our query using a concatenated string. This is a BIG no-no.
  var query = 'SELECT * FROM `accounts` WHERE `id`='+ uid;
  console.log(query);
  connection.query(query, function(err, queryres) {
		if (err) {throw err}
		console.log(queryres);

		res.json(queryres);


	});
});


app.get('/query2/',function(req,res){
  var uid=req.query.ID;
  var pass=req.query.pass;

  var query = 'SELECT * FROM `accounts` WHERE `id`='+ uid + ' AND  `password`= ' + pass.toString();

  console.log(query);
  connection.query(query, function(err, queryres) {
		if (err) {throw err}
		console.log(queryres);

		res.json(queryres);


	});
});

app.listen(3000||process.env.port, function(){
	console.log('listening on port')
});
