const express = require('express');

const historySnapshot = require('../models/historySnapshot');

const router = express.Router();

async function getHistory(cryptoSymbol, currencySymbol){
	
	var history = await historySnapshot.find({crypto: cryptoSymbol, currency: currencySymbol})
	
	return(await history);
	
}

router.all('/:cryptoSymbol/:currencySymbol', (req, res) => {
	
	historySnapshot.findOne({crypto: cryptoSymbol, currency: currencySymbol}).then(function(result){
		return res.status(200).json({
			message: "Data available for " + cryptoSymbol + "-" + currencySymbol,
			data: result
		})
	});
	
});


module.exports = router;