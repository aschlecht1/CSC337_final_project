/*Anthony Schlecht and Andrew Enriquez*/
/*CSC 337 SP18 002*/
/*This is the JavaScript file that acts as a local server and database*/
"use strict";

const MongoClient = require("mongodb");
const MONGO_URL = 'mongodb://localhost:27017/';

const express = require("express");
const app = express();
//var fs = require('fs'); not needed because database info will be stored on computer

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
		collection = db.collection('cities');     //Can I create the database here and update the city collection in another function!!!!!!!?????????
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
		collection = db.collection('cities');
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
	console.log(city); 
	const query = { "city" : city };
	const newEntry = { "city" : city, "snrValue" : randomNumber() };
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

