var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./lib/models/usersModel') // model assign to user variable


var port = 8888;
var app = express();
var mongoUri = 'mongodb://localhost:27017/clients-users'
app.use(bodyParser.json());

//in a promise yo get response in promise
app.post('/api/user', function(req, res) {
	// could use save also
	User.create(req.body).then(function(response) {
		res.status(200).json(response);
	},
	function(err) {
		res.status(500).json(err)
	})
})


app.get('/api/users', function(req, res) {
	User.find({}, function(err, docs) {
		if(!err) {
			if(docs.length === 0){
				res.status(404).json(docs)
			} else {
				res.status(200).json(docs);
			}
			
		}
		else {res.status(500).json(err)}
	})
})

// using save instead of create make
// var user = new User(req.body);
// user.save(function(err, response) {
// 	if(!err) {
// 		res.status(200).json(user);
// 	} else {res.status(500).json(err)}
// })

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
	console.log('connected to db at ' + mongoUri)
})






app.listen(port, function() {
	console.log('listening to ' + port)
})