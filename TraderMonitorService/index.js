const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");
const app = express();

require("DOTenv").config();

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
	mongoose.connect(uri).then(() => {
		console.log('Connected to MongoDB');
		// Perform further operations here
			
		const connection = mongoose.connection;
		connection.once("open", () => {
		  console.log("MongoDB database connection established successfully");
		});

		// Route Imports
		console.log("Initiating Route Setup Process");



		app.get("/", (req, res) => {
			res.send("System is alive");
			console.log("Request detected");
		});
		
		const targets = require('./routes/MonitorTarget');
		const history = require('./routes/history');
		
		app.use('/target', targets);
		app.use('/log', history);

		console.log("Route Setup Process Complete");
		// End Route Imports
		
		

		//Scheduled Task Imports
		console.log("Initiating scheduled function setup process");

		//const scheduledFunctions = require('./scheduledFunctions/testscheduled');
		
		
		const scheduledUpdate = require('./scheduledFunctions/updateMonitor');
		const scheduledAnalysis = require('./scheduledFunctions/analyzeLastUpdate');
		
		scheduledUpdate.initScheduledJobs("*/30 * * * * *");
		
		scheduledAnalysis.initScheduledJobs("*/30 * * * * *");
		
		/*
		05 min sma
		10 min sma
		30 min sma
		60 min sma
		90 min sma
		*/
		
		//Maybe I should have a table inside of the database for this system consisting of all of the coins monitored and then automate the whole spinning up of these scheduled processes
		
		
		
		
		console.log("Scheduled function setup process complete");
		
		//End Scheduled Task Imports


		app.listen(port, () => {
		  console.log(`Server is running on port: ${port}`);
		});
	}).catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});;


	}
catch(error){
	console.log(error);
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});