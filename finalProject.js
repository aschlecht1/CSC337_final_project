/*Anthony Schlecht and Andrew Enriquez*/
/*CSC 337 SP18 002*/
/*This is the the javaScript file for finalProject.html*/
(function() {
	"use strict";
	window.onload = function() {
		document.getElementById("submit").onclick = searchPath;
		document.getElementById("reset").onclick = resetPage;
		//document.getElementById("SNRdiv").addEventListener("mouseover", mouseOverSNR());
		var initSetInterval = setInterval(startInterval, 20000);  //Updates SNR values for each city
		 //every 20 sec (Should be every 10 min to mimic WSPR database updating every 10 min with real SNR values)
		 // WSPR database link (http://wsprnet.org/drupal/wsprnet/spots)
	};

	//Updates the database every 5 sec using a POST (kina like a fetch request with additional info) request
	function startInterval() {
		var randSNR = [];
		const message = {};
		for (var i=0; i<=5; i++) {
			randSNR[i] = randomNumber();
			//console.log(randSNR[i]);
		}
		message["values"] = randSNR;


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
		var e = document.getElementById("select");
		var value = e.options[e.selectedIndex].value;
		var text = e.options[e.selectedIndex].text; 
		console.log(text);
		var url = "http://localhost:3000?city=" + text;  //sends a query parameter that can be accessed by the app.GET function to find the index we want

		fetch(url)
			.then(checkStatus)
			//Success: Do something with responseText
			.then(function(responseText) { 
				console.log(responseText);
				//going to need code to deal with the return JSON
				var obj = JSON.parse(responseText);
				console.log(obj[0].value);

				var SNRchild = document.createElement("p");
				var elem = document.createElement("img")

				SNRchild.innerHTML = "From Tucson to "+ obj[0].city +": "+obj[0].value+" dB";
				SNRchild.appendChild(elem);
				elem.onmouseover = mouseOverSNR;
				elem.onmouseout = mouseOut;
				elem.onmousedown = clickDown;

				document.getElementById("SNR").appendChild(SNRchild);

				elem.src = obj[0].city +".PNG";
				elem.setAttribute("height", "120");


		
			})
			//Error: Do something with error
			.catch(function(error) {
				console.log(error);
			});
	}

	function clickDown () {
		if (this.height == 600) {
			this.setAttribute("height", "120");
		}
		else {
				this.setAttribute("height", "600");
		}

	}
	//clear out city that was initially chosen, remove map pic and SNR value
	function resetPage() {
		document.getElementById("select").selectedIndex = 0;
		document.getElementById("SNR").innerHTML = "SNR:";
    //document.getElementById("reviews").innerHTML = "";
    console.log("cleared");
	}

	//when mouse hovers over section that contains
	//SNR value, display picture of path from tucson to selected city
	function mouseOverSNR() {
		this.style.cursor = "pointer";
	}
	function mouseOut() {
		this.style.cursor = "default";
	}

	function checkStatus(response) {
	    if (response.status >= 200 && response.status < 300) {
	        return response.text();
	    } else if (response.status == 410) {
	    	return Promise.reject(new Error("Sorry, the state you requested does not contain any information."));
	    } else if (response.status == 404){
	      return Promise.reject(new Error("HTTP 404 File Not Found error. Please check that you are accessing then correct server address."));
	    } else {
	        return Promise.reject(new Error(response.status+": "+
	        response.statusText));
	    }
	}

	function randomNumber() {
		var randomNumberBetween0and40 = (Math.floor(Math.random()*40)).toString();
		return randomNumberBetween0and40;
	} 

})();

