const openGeocoder = require('node-open-geocoder');
const Nominatim = require('nominatim-geocoder');
const { GetLatLngByAddress } = require('@geocoder-free/google');
const { Client } = require("@googlemaps/google-maps-services-js");

const geocoder = new Nominatim()

const csv = require('csvtojson')
const FileSystem = require("fs");

const client = new Client({});

async function lookup(centerdata) {
	await new Promise(r => GetLatLngByAddress(centerdata.Address)
		.then((data) => {
			if (data.length == 0) {
				//console.log(centerdata.Address + " ******* FAILED " + data);
				lookupCity(centerdata);
			}
		}
		));
}

async function lookupCity(centerdata) {
	await new Promise(r => GetLatLngByAddress(centerdata.City + "," + centerdata.State)
		.then((data) => {
			if (data.length == 0) {
				lookupState(centerdata);
			}
		}
		));
}

async function lookupState(centerdata) {
	await new Promise(r => GetLatLngByAddress(centerdata.State)
		.then((data) => {
			if (data.length == 0) {
				console.log("Failed!!! " + centerdata.Address);
			}
		}
		));
}



function geocodeAddress(address) {

	client
		.geocode({ address: address, key: "AIzaSyBHp_OPZsfPm6bkyK4tQyPGapFVP_7TVp4" }, (results, status) => {
			if (status === "OK") {
				console.log(results);
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		})
		.catch(error => {
			console.log(error);
		})

}

// Invoking csv returns a promise
const converter = csv()
	.fromFile('2021_04_23_WCSC_Centers.csv')
	.then((centersData) => {
		for (var i = 0; i < centersData.length; i++) {
			let centerData = centersData[i];

			if (!centerData.lat || !centerData.long) {
				console.log("Looking Up: " + centerData.Address);
				lookup(centerData);
				// openGeocoder()
				// 	.geocode(centerData.Address)
				// 	.end((err, res) => {
				// 		console.log(res);
				// 	});

				// geocoder.search( { q: centerData.Address } )
				// .then((response) => {
				// 	console.log("Pass");
				// 	console.log(response);
				// })
				// .catch((error) => {
				// 	console.error("Fail");
				// 	console.log(error);
				// })

				//lookup(centerData.Address);
				//geocodeAddress(centerData.Address);

			}

		}


		//var centersByCountry = processByCountry(json);

		//FileSystem.writeFile('centers-l5.json', JSON.stringify(centersByCountry, null, 2), (err) => {
		//    if (err) throw err;
		//});
	});

