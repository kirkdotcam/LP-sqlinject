//This version of the app correctly uses the ? ?? method for performing queries, and does NOT allow multiple queries.

var mysql = require('mysql');
var express = require('express');
var path = require('path');
//var key = require('./keys.js')
var app = express();
app.use(express.static('public'))

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "injection_db",
  //multipleStatements: true
});

connection.connect(function(err) {
  if (err) {throw err};
});

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname, "public/html/view.html"));
	//res.send('sup');

});

app.get('/query/',function(req,res){
  var uid=req.query.ID;
  var pass=req.query.pass;

  var query = 'SELECT * FROM `accounts` WHERE `fname`= ?';
  console.log(query);
  connection.query(query,uid, function(err, queryres) {
		if (err) {throw err}
		console.log(queryres);

		res.json(queryres);


	});
});

app.get('/query2/',function(req,res){
  var uid=req.query.ID;
  var pass=req.query.pass;

  var query = 'SELECT * FROM `accounts` WHERE `fname`= ? AND  `password`= ? ';

  console.log(query);
  connection.query(query,[uid,pass], function(err, queryres) {
		if (err) {throw err}
		console.log(queryres);

		res.json(queryres);


	});
});

app.listen(3000||process.env.port, function(){
	console.log('listening on port')
});
