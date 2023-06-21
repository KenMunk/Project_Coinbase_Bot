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
		scheduledEthUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *");
		scheduledEthUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *");
		scheduledEthUpdate.initScheduledJobs("APT","USD","*/20 * * * * *");

		const scheduleDataScoreUpdate = require('./scheduledFunctions/checkDataDensity');

		scheduleDataScoreUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",1080,6);
		scheduleDataScoreUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",1080,6);
		scheduleDataScoreUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",1080,6);
		scheduleDataScoreUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",1080,6);


		const scheduledSMAUpdate = require('./scheduledFunctions/updateSellSMA');

		scheduledSMAUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",5*60000,"5MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",10*60000,"10MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",30*60000,"30MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",60*60000,"60MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ETH","USD","*/20 * * * * *",90*60000,"90MinPrice");
		
		scheduledSMAUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *",5*60000,"5MinPrice");
		scheduledSMAUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *",10*60000,"10MinPrice");
		scheduledSMAUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *",30*60000,"30MinPrice");
		scheduledSMAUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *",60*60000,"60MinPrice");
		scheduledSMAUpdate.initScheduledJobs("DOT","USD","*/20 * * * * *",90*60000,"90MinPrice");
		
		scheduledSMAUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",5*60000,"5MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",10*60000,"10MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",30*60000,"30MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",60*60000,"60MinPrice");
		scheduledSMAUpdate.initScheduledJobs("ATOM","USD","*/20 * * * * *",90*60000,"90MinPrice");
		
		scheduledSMAUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",5*60000,"5MinPrice");
		scheduledSMAUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",10*60000,"10MinPrice");
		scheduledSMAUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",30*60000,"30MinPrice");
		scheduledSMAUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",60*60000,"60MinPrice");
		scheduledSMAUpdate.initScheduledJobs("APT","USD","*/20 * * * * *",90*60000,"90MinPrice");
		
		
		const scheduledBuySellDifferential = require('./scheduledFunctions/updateBuySellDifferential');

		scheduledBuySellDifferential.initScheduledJobs("ETH","USD","*/20 * * * * *",25000,"25SecDiff");
		scheduledBuySellDifferential.initScheduledJobs("ETH","USD","*/20 * * * * *",5*60000,"5MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("ETH","USD","*/20 * * * * *",10*60000,"10MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("ETH","USD","*/20 * * * * *",90*60000,"90MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("ETH","USD","*/20 * * * * *",6*60*60000,"6HourDiff");

		scheduledBuySellDifferential.initScheduledJobs("DOT","USD","*/20 * * * * *",25000,"25SecDiff");
		scheduledBuySellDifferential.initScheduledJobs("DOT","USD","*/20 * * * * *",5*60000,"5MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("DOT","USD","*/20 * * * * *",10*60000,"10MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("DOT","USD","*/20 * * * * *",90*60000,"90MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("DOT","USD","*/20 * * * * *",6*60*60000,"6HourDiff");

		scheduledBuySellDifferential.initScheduledJobs("ATOM","USD","*/20 * * * * *",25000,"25SecDiff");
		scheduledBuySellDifferential.initScheduledJobs("ATOM","USD","*/20 * * * * *",5*60000,"5MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("ATOM","USD","*/20 * * * * *",10*60000,"10MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("ATOM","USD","*/20 * * * * *",90*60000,"90MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("ATOM","USD","*/20 * * * * *",6*60*60000,"6HourDiff");

		scheduledBuySellDifferential.initScheduledJobs("APT","USD","*/20 * * * * *",25000,"25SecDiff");
		scheduledBuySellDifferential.initScheduledJobs("APT","USD","*/20 * * * * *",5*60000,"5MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("APT","USD","*/20 * * * * *",10*60000,"10MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("APT","USD","*/20 * * * * *",90*60000,"90MinDiff");
		scheduledBuySellDifferential.initScheduledJobs("APT","USD","*/20 * * * * *",6*60*60000,"6HourDiff");
		
		const scheduledBSDSMA = require('./scheduledFunctions/updateBuySellDifferential');
		
		/*
		05 min sma
		10 min sma
		30 min sma
		60 min sma
		90 min sma
		*/
		
		//Maybe I should have a table inside of the database for this system consisting of all of the coins monitored and then automate the whole spinning up of these scheduled processes
		
		scheduledBSDSMA.initScheduledJobs("ETH","USD","*/20 * * * * *",5*60000,"5MinDiffSMA","25SecDiff");
		scheduledBSDSMA.initScheduledJobs("ETH","USD","*/20 * * * * *",10*60000,"10MinDiffSMA","25SecDiff");
		
		
		
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