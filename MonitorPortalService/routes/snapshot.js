const express = require('express');

const historySnapshot = require('../models/historySnapshot');

const router = express.Router();

async function getHistory(cryptoSymbol, currencySymbol){
	
	var history = await historySnapshot.findOne({crypto: cryptoSymbol, currency: currencySymbol})
	
	return(await history);
	
}

router.all('/clean/:cryptoSymbol/:currencySymbol', (req, res) => {
	const cryptoSymbol = req.params.cryptoSymbol+"";
	const currencySymbol = req.params.currencySymbol+"";
	
	historySnapshot.find({crypto: cryptoSymbol, currency: currencySymbol}).then(function(result){
		console.log(result);
		if(result.length > 0){
			return res.status(200).json({
				message: "Data available for " + cryptoSymbol + "-" + currencySymbol,
				data: result[0].snapshot.data
			})
		}
		else{
			return res.status(404).json({
				message: "Data available for " + cryptoSymbol + "-" + currencySymbol,
				data: {}
			})
		}
		//wtf why doesn't the snapshot show up???
	});
	
	
});

router.all('/:cryptoSymbol/:currencySymbol', (req, res) => {
	
	const cryptoSymbol = req.params.cryptoSymbol+"";
	const currencySymbol = req.params.currencySymbol+"";
	
	historySnapshot.find({crypto: cryptoSymbol, currency: currencySymbol}).then(function(result){
		console.log(result);
		if(result.length > 0){
			return res.status(200).json({
				message: "Data available for " + cryptoSymbol + "-" + currencySymbol,
				data: result[0]
			})
		}
		else{
			return res.status(404).json({
				message: "Data available for " + cryptoSymbol + "-" + currencySymbol,
				data: {}
			})
		}
		//wtf why doesn't the snapshot show up???
	});
	
});


module.exports = router;