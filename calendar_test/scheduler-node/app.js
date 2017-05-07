var express = require('express');
var path = require('path');
var pgp = require('pg-promise')({promiseLib: Promise});
var config = require('./config/config.js');
var bodyParser = require('body-parser');

var db = pgp({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});



var app = express();
// Serve up public files at root
app.use(express.static('public'));

// Add to request object the body values from HTML
app.use(bodyParser.urlencoded({extended: false}));

console.log('test');
app.get('/init', function(req, res){
  console.log('test');
	db.event.insert({
		text:"My test event A",
		start_date: new Date(2013,8,1),
		end_date:	new Date(2013,8,5)
	});
	db.event.insert({
		text:"My test event B",
		start_date: new Date(2013,8,19),
		end_date:	new Date(2013,8,24)
	});
	db.event.insert({
		text:"Morning event",
		start_date: new Date(2013,8,4,4,0),
		end_date:	new Date(2013,8,4,14,0)
	});
	db.event.insert({
		text:"One more test event",
		start_date: new Date(2013,8,3),
		end_date:	new Date(2013,8,8),
		color: "#DD8616"
	});

	res.send("Test events were added to the database")
});


app.get('/data', function(req, res){
	db.event.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;

		//output response
		res.send(data);
	});
});


app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.id;
	var tid = sid;

	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;

		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}

	if (mode == "updated")
		db.event.updateById( sid, data, update_response);
	else if (mode == "inserted")
		db.event.insert(data, update_response);
	else if (mode == "deleted")
		db.event.removeById( sid, update_response);
	else
		res.send("Not supported operation");
});

app.listen(3000);
