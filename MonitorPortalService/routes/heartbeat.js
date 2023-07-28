const express = require('express');

const historySnapshot = require('../models/historySnapshot');

const router = express.Router();

async function getHistory(cryptoSymbol, currencySymbol){
	
	var history = await historySnapshot.findOne({crypto: cryptoSymbol, currency: currencySymbol})
	
	return(await history);
	
}

async function getPulse(){
	var history = await historySnapshot.find();
	
	return(await history.snapshot.data);
}

router.all('heartbeat', (req, res) => {
	
	return res.status(200).json({
		message: "Server is alive",
		
	})
	
});

router.all('', (req, res) => {
	
	return res.status(200).json({
		
		message: "Server is alive"
		
	});
	
});

module.exports = router;