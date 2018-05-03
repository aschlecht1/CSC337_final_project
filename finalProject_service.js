/*Anthony Schlecht and Andrew Enriquez*/
/*CSC 337 SP18 002*/
/*This is the JavaScript file that acts as a local server and database*/
/*We built our database using MongoDB. We added a new collection to the 'imdb' database
called 'myNewCollection' and populated a new index containing a list of cities and associated 
SNR values. Our GET and POST request pull from and update this database*/

const express = require("express");
const MongoClient = require("mongodb");
const MONGO_URL = 'mongodb://localhost:27017/';

const app = express();
app.use(express.static('public'));
  
//code needed for Preflight CORS error
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//GET Function (gets the index from the database that contains )
app.get('/', function (req, res) {  //if want two diffent gets replace '/' with whatever you want, could be '/1' or '/2' but these need to be defined in you javascript (fetch) code
	res.header("Access-Control-Allow-Origin", "*");
	var city = req.query.city;     //pull the value sent into the app.get function 
	var db = null;
	var collection = null;
	var result = null;

	console.log(city);

	MongoClient.connect(MONGO_URL, function(err, client) {
	    db = client.db('imdb');
	    collection = db.collection('myNewCollection');
	    result = query(city, collection, res);

	});
})

// allows eazy access to paramaters
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


//POST function
app.post('/', jsonParser, function (req, res) {
	var random = req.body.values;  //need to add a value to pass into database
	//console.log(random);
	var db = null;
	var collection = null;
	var cities = ["washingtonDC", "newYork", "cleveland", "seattle", "losAngeles", "gainesville"];

	//The end of the connection string specifies the database name we want to use
	//If a database of that name doesn't already exist, it will be created the first time we write to it
	MongoClient.connect(MONGO_URL, function(err, client) {   //Creates Database since there is no database yet

		db = client.db('imdb');
		collection = db.collection('myNewCollection');

		for (var i=0; i<cities.length; i++) {
			const query = { "city" : cities[i] };
			const newEntry = { "city" : cities[i], "value" : random[i] };
			collection.update(query, newEntry);
			console.log(random[i]);
		}
	});
		
	res.send("Cities SNR's Updated");
});

async function query(city, collection, res) {
    const doc = { "city" : city};
    var result = await collection.find(doc).toArray();
    console.log(result);
    res.send(JSON.stringify(result));
}   

app.listen(3000);