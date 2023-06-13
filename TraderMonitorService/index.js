const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");
const app = express();

require("dotenv").config();

try{
	// Route Imports
	console.log("Initiating Route Import Process");

	//Cannot run on render



	console.log("Route Import Process Complete");
	// End Route Imports

	const port = process.env.PORT || 3000;
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	var corsOptions = {
	  origin: process.env.IP.split(','),
	  credentials: true,
	};
	app.use(cors(corsOptions));

	const uri = process.env.ATLAS_URI;
	mongoose.connect(uri);

	const connection = mongoose.connection;
	connection.once("open", () => {
	  console.log("MongoDB database connection established successfully");
	});

	// Route Imports
	console.log("Initiating Route Setup Process");



	app.get("/", (req, res) => {
		res.send("");
		console.log("Request detected");
	});

	console.log("Route Setup Process Complete");
	// End Route Imports


	//Scheduled Task Imports
	console.log("Initiating scheduled function setup process");

	//const scheduledFunctions = require('./scheduledFunctions/testscheduled');

	const scheduledEthUpdate = require('./scheduledFunctions/checkPrices');

	//scheduledFunctions.initScheduledJobs();
	scheduledEthUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *");
	scheduledEthUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *");
	scheduledEthUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *");
	scheduledEthUpdate.initScheduledJobs("APT","USD","*/20 * * * * *");

	const scheduleDataScoreUpdate = require('./scheduledFunctions/checkDataDensity');

	scheduleDataScoreUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",1080,6);
	scheduleDataScoreUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *",1080,6);
	scheduleDataScoreUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",1080,6);
	scheduleDataScoreUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",1080,6);

	//Too sluggish
	//scheduledEthUpdate.initScheduledJobs("ADA","USD","2 */2 * * * *");
	//scheduledEthUpdate.initScheduledJobs("MATIC","USD","2 */2 * * * *");


	//SHIB is too close to zero to monitor
	//scheduledEthUpdate.initScheduledJobs("SHIB","USD");

	console.log("Scheduled function setup process complete");
	//End Scheduled Task Imports


	app.listen(port, () => {
	  console.log(`Server is running on port: ${port}`);
	});

	}
catch(error){
	console.log(error);
}