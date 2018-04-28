/*Anthony Schlecht and Andrew Enriquez*/
/*CSC 337 SP18 002*/
/*This is the the javaScript file for finalProject.html*/
(function() {
	"use strict";
	window.onload = function() {
		document.getElementById("search").onclick = searchPath;
		document.getElementById("reset").onclick = resetPage;
		document.getElementById("SNRdiv").addEventListener("mouseover", mouseOverSNR());
		setInterval(startInterval, 5000);  //Updates SNR values for each city
		 //every 5 sec (real like every 10 min to mimic WSPR database updating every 10 min)
	};

	//Updates the database every 5 sec using a POST (kina like a fetch request with additional info) request
	function startInterval() {

		var fetchOptions = {  
			method : 'POST',
			headers : {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(message)
		};

		var url = "http://localhost:3000";
		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
			console.log(responseText);
			})
			.catch(function(error) {
				console.log(error);
   			});
	}

	//Get data from the database using a fetch request
	function searchPath() {
		var url = "http://localhost:3000";
		fetch(url)
			.then(checkStatus)
			//Success: Do something with responseText
			.then(function(responseText) { 
				console.log(responseText);
				}
			})

			//Error: Do something with error
			.catch(function(error) {
				//document.getElementById("errors").innerHTML = error;
			});

	}

	//clear out city that was initially chosen, remove map pic and SNR value
	function resetPage() {
		
	}

	//when mouse hovers over section that contains
	//SNR value, display picture of path from tucson to selected city
	function mouseOverSNR() {

	}

})();
