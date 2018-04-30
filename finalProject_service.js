// Allison Obourn
// CSC 337, Spring 2018
// Lecture 34

// logs all of the movies with genres other than animation made in
// 1950 and 1951
(function () {
  "use strict";
	var fs = require('fs');
const express = require("express");
const MongoClient = require("mongodb");
const MONGO_URL = 'mongodb://localhost:27017/';

const app = express();
console.log("web service started")
app.use(express.static('public'));

//app.use(express.static('public'));
//code needed for Preflight CORS error
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// allows eazy access to paramaters
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', jsonParser, function (req, res) {
	var db = null;
	var collection = null;
	var cities = ["washingtonDC", "newYork", "cleveland", "seattle", "losAngeles", "gainesville"];    //Global variable??
	var result = null;
	//var resultArray = [];
	var newEntryArray = [];

	//var update = 0;
	for (var i=0; i<=cities.length; i++) {
		var random = randomNumber();
		//resultArray.push(random);
		console.log("server_side newEntryArray: "+newEntryArray);
		var random = randomNumber();
			//resultArray.push(random);
		//console.log(random);
			const query = { "city" : cities[i] };
			const newEntry = { "city" : cities[i], "value" : random };
		//res.send("hello");
		newEntryArray.push(newEntry);
	}
	res.send(newEntryArray);

	//The end of the connection string specifies the database name we want to use
	//If a database of that name doesn't already exist, it will be created the first time we write to it
	/*MongoClient.connect(MONGO_URL, function(err, client) {   //Creates Database since there is no database yet
		db = client.db('myfirstdatabase');
		collection = db.collection('myNewCollection2');

		for (var i=0; i<=cities.length; i++) {
		var random = randomNumber();
			resultArray.push(random);
		//console.log(random);
			const query = { "city" : cities[i] };
			const newEntry = { "city" : cities[i], "value" : random };
			collection.update(query, newEntry);

		}*/
})
	/*
	MongoClient.connect(MONGO_URL, function(err, client) {
	    db = client.db('imdb');
	    collection = db.collection('myNewCollection');

	    for (var i=0; i<=cities.length; i++) {
	    	result = query(cities[i], collection).then(console.log(result));
	    	//console.log(result);
	    	resultArray += result.value;
		}
		});
	*/


//});

/*
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");

	// connect to the movies collection in the imdb database
	var cities = ["washingtonDC", "newYork", "cleveland", "seattle", "losAngeles", "gainesville"];    //Global variable??
	var db = null;
	var collection = null;
	var result = {};
	var resultArray = [];
	MongoClient.connect(MONGO_URL, function(err, client) {
	    db = client.db('imdb');
	    collection = db.collection('myNewCollection');

	    for (var i=0; i<=cities.length; i++) {
	    	result = query(city, collection);
	    	console.log(result[2]);
	    	resultArray += result[2];
		}
		console.log(resultArray);
	});
	//res.send(JSON.stringify(result));
	res.send(result[2]);
})
*/

// takes a year to search for and a collection to search through as parameters
// logs the liset of all of the movies made in that year or the one
// after that do not have the genre of animation
/*async function query(city, collection) {
    //const doc = { "year" : {$in : [year, year + 1]}, "genre": { $ne :"Animation" }};
    const doc = { "city" : city};
    var result = await collection.find(doc).toArray();
    //var snr = result[2].value;
    //console.log(result);
    return result;
}
*/
function randomNumber() {
	var randomNumberBetween0and40 = (Math.floor(Math.random()*40)).toString();
	return randomNumberBetween0and40;
}

/*
function update(newCity, collection) {
	var random = randomNumber()
	console.log(random);
	const query = { "city" : newCity };
	const newEntry = { "city" : newCity, "value" : random };
	collection.update(query, newEntry);
}
*/

app.listen(3000);
})();


/*
const MongoClient = require("mongodb");
const MONGO_URL = 'mongodb://localhost:27017/';

const express = require("express");
const app = express();
var fs = require('fs'); //not needed because database info will be stored on computer

app.use(express.static('public'));
//code needed for Preflight CORS error
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// allows eazy access to paramaters
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Deals with a POST request ( contains an array of city names)
app.post('/', jsonParser, function (req, res) {
	var db = null;
	var collection = null;
	//The end of the connection string specifies the database name we want to use
	//If a database of that name doesn't already exist, it will be created the first time we write to it
	MongoClient.connect(MONGO_URL, function(err, client) {   //Creates Database since there is no database yet
		db = client.db('imdb');
		collection = db.collection('myNewCollection');

		query("washingtonDC", collection);

		//update(cleveland, collection);
		console.log(collection);
	});
	res.send("Cities SNR's Updated");
});

//replaces the SNR Value for a state in the database
function update(city, collection) {
	var random = randomNumber()
	console.log(random);
	const query = { "city" : city };
	const newEntry = { "city" : city, "value" : random };
	const params = { upsert : true };
	collection.update(query, newEntry, params);
}

function randomNumber() {
	var randomNumberBetween0and40 = (Math.floor(Math.random()*40)).toString();
	return randomNumberBetween0and40;
}

function query(city, collection) {
const doc = { "city" : city };
collection.findOne(doc, function (err, result) {
console.log(result);
});
}

app.listen(3000);
*/




/*Anthony Schlecht and Andrew Enriquez*/
/*CSC 337 SP18 002*/
/*This is the JavaScript file that acts as a local server and database*/

/*
"use strict";

const MongoClient = require("mongodb");
const MONGO_URL = 'mongodb://localhost:27017/';

const express = require("express");
const app = express();
var fs = require('fs'); not needed because database info will be stored on computer

app.use(express.static('public'));
//code needed for Preflight CORS error
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var db = null;
var collection = null;

var cities = ["washingtonDC", "newYork", "cleveland", "seattle", "losAngeles", "gainesville"];    //Global variable??

// allows eazy access to paramaters
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Deals with a POST request ( contains an array of city names)
app.post('/', jsonParser, function (req, res) {
	var db = null;
	var collection = null;
	//The end of the connection string specifies the database name we want to use
	//If a database of that name doesn't already exist, it will be created the first time we write to it
	MongoClient.connect(MONGO_URL, function(err, client) {   //Creates Database since there is no database yet
		db = client.db('snrValues');
		collection = db.collection('usercollection');     //Can I create the database here and update the city collection in another function!!!!!!!?????????


		for (var i=0; i<cities.length; i++) {

			update(cities[i], collection);  //replaces each city in the database with a city name and new random number each time it is called
		}

	});
	console.log("cities");
	res.send("Cities SNR's Updated");
});

//Deals with a GET request
//req: an object representing the request
//res: an object representing the response
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	var db = null;
	var collection = null;
	var json = {};
	MongoClient.connect(MONGO_URL, function(err, client) {
		db = client.db('snrValues');
		collection = db.collection('usercollection');
		console.log(cities);
		for (var i=0; i<cities.length; i++) {
			var data = query(cities[i], collection);
			console.log(data);
			//json.push(data);

		}
	});
	res.send(JSON.stringify(json)); //send JSON obj
});


//generates a random number to represent SNR from 0 to 40
function randomNumber() {
	var randomNumberBetween0and40 = Math.floor(Math.random()*40);
	return randomNumberBetween0and40;
}

//replaces the SNR Value for a state in the database
function update(city, collection) {
	var random = randomNumber()
	console.log(city);
	const query = { "city" : city };
	const newEntry = { "city" : city, "value" : random };
	const params = { upsert : true };
	collection.update(query, newEntry, params);
}

async function query(city, collection) {
    const doc = { "city" : city };
    var result = await collection.find(doc).toArray();
    console.log(result);
    return result;
}

//app.listen(27017);  //This is set up when we run Mongodb in the Terminal/Powershell
app.listen(3000);

*/
