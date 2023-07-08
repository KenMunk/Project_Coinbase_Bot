const express = require('express');

const historySnapshot = require('../models/historySnapshot');

const router = express.Router();

async function getHistory(cryptoSymbol, currencySymbol){
	
	var history = await historySnapshot.findOne({crypto: cryptoSymbol, currency: currencySymbol})
	
	return(await history);
	
}

router.all('/:cryptoSymbol/:currencySymbol', (req, res) => {
	
	const cryptoSymbol = req.params.cryptoSymbol+"";
	const currencySymbol = req.params.currencySymbol+"";
	
	historySnapshot.findOne({crypto: cryptoSymbol, currency: currencySymbol}, {}, {notInSchema: 1 }).then(function(result){
		console.log(result);
		return res.status(200).json({
			message: "Data available for " + cryptoSymbol + "-" + currencySymbol,
			data: result
		})
	});
	
});


module.exports = router;