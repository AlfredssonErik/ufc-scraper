var express = require("express");
var cors = require('cors');
var app = express();
var ufc = require('./services/ufc');

var whitelist = ['https://alfredssonerik.github.io'];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on env port or port 3000");
});

app.get("/athlete/:name", cors(corsOptions), (req, res, next) => {
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

app.get("/rankings", cors(corsOptions), (req, res, next) => {
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