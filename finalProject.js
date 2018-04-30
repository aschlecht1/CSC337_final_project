
/*Anthony Schlecht and Andrew Enriquez*/
/*CSC 337 SP18 002*/
/*This is the the javaScript file for finalProject.html*/

(function() {
	"use strict";
	window.onload = function() {
		document.getElementById("submit").onclick = searchPath;
		document.getElementById("reset").onclick = resetPage;
		//document.getElementById("SNRdiv").addEventListener("mouseover", mouseOverSNR());
		//var initSetInterval = setInterval(startInterval, 5000);  //Updates SNR values for each city
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
			.then(function(responseText) {
				//resetPage();
				var snrInfo = JSON.parse(responseText);
				console.log(snrInfo);
				var city = document.getElementById("select");
				var text = city.options[city.selectedIndex].value;
				var snrValue = 0;
				console.log(text);

				for (var i = 0; i < snrInfo.length; i++) {
					var snrCity = snrInfo[i]["city"];
					console.log(snrCity);
					if (text == snrCity){
						//console.log(snrInfo[i]["city"]);
						snrValue = snrInfo[i]["value"]
						console.log(snrValue);
					}

				}
				var SNRchild = document.createElement("p");
				var elem = document.createElement("img")

				SNRchild.innerHTML = "From Tucson to "+city.options[city.selectedIndex].text+": "+snrValue+" dB";
				SNRchild.appendChild(elem);
				elem.onmouseover = mouseOverSNR;
				elem.onmouseout = mouseOut;
				elem.onmousedown = clickDown;

				document.getElementById("SNR").appendChild(SNRchild);

				elem.src = text+".PNG";
				elem.setAttribute("height", "120");
				//elem.setAttribute("width", "1024");
				//elem.setAttribute("alt", "Flower");
				//doucment.getElementById("map").appendChild(elem);
			})
			.catch(function(error) {
			});
	    //addInfo(thisDivFolder);
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

})();
