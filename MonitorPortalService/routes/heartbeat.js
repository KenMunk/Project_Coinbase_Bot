const express = require('express');

const historySnapshot = require('../models/historySnapshot');

const router = express.Router();

async function getHistory(cryptoSymbol, currencySymbol){
	
	var history = await historySnapshot.findOne({crypto: cryptoSymbol, currency: currencySymbol})
	
	return(await history);
	
}

async function getPulse(){
	var history = await historySnapshot.findOne();
	var lastTimestamp = history.snapshot.data.pop().timestamp
	var timeOfNow = (Date.now().valueOf())
	console.log("Last timestamp was " + (timeOfNow - lastTimestamp)/1000 + " seconds ago");
	return((timeOfNow - lastTimestamp)/1000);
}


router.all('/', (req, res) => {
	
	return res.status(200).json({
		
		message: "Server is alive"
		
	});
	
}); 

router.all('/heartbeat', (req, res) => {
	
	var response = {
		message: "Server is alive",
		data: null
	};
	
	
	console.log("Heartbeat requested");
	
	getPulse().then(function(dataPulse){
		response.data = dataPulse;
		
		return res.status(200).json(response);
	});
	
	//return res.status(404).json({message: "Pulse data not found"});
	
});

module.exports = router;