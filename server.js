var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');




var app = express();
app.use(bodyParser.json());
app.use(cors());
var db = mongojs("birds");
var sightings = db.collection("sightings");

//post get put delete

app.get('/api/sighting', function (req, res, next) {
	sightings.find(req.query, function (err, result) {
		if (err) return res.send(err);
		else return res.status(200).json(result);
	})

	console.log(req.query);

})

app.post('/api/sighting', function (req, res, next) {
	sightings.insert(req.body, function (err, result) {
		if (err) return res.send(err);
		else return res.status(200).json(result);

	})


})
app.put('/api/sighting', function (req, res, next) {

	sightings.update({"_id": mongojs.ObjectId(req.query.id)}, req.body, function(err, result){
		
	});

})
app.delete('/api/sighting', function (req, res, next) {

	sightings.remove({"_id": mongojs.ObjectId(req.query.id)}, function(err, result){
		
	})



})












app.listen(4001, function () {
	console.log("listening on port 4001");
})