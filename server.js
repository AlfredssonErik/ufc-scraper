var express = require("express");
var app = express();
var ufc = require('./services/ufc')

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on env port or port 3000");
});

app.get("/athlete/:name", (req, res, next) => {
	console.log('Fighter: retrieving...');
	ufc.getFighter(req.params.name)
	.then(result => {
		console.log('Success');
		res.json(result);
	}, err => {
		console.log('UFC: error: ', err);
		res.status(500).send(err);
	})
});

app.get("/rankings", (req, res, next) => {
	console.log('Rankings: retrieving...');
	ufc.getRankings()
	.then(result => {
		console.log('Success');
		res.json(result);
	}, err => {
		console.log('UFC: error: ', err);
		res.status(500).send(err);
	})
});