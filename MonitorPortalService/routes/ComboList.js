const express = require('express');

const historySnapshot = require('../models/historySnapshot');

const router = express.Router();

async function getList(cryptoSymbol, currencySymbol){
	
	var combos = await historySnapshot.find().select({$project: {_id: 0, crypto: 1, currency: 1}})
	
	return(await combos);
	
}

router.all('/getList', (req, res) => {
	
	
historySnapshot.find({},'crypto currency').then(function(doc){
		console.log(result);
		if(result.length > 0){
			return res.status(200).json({
				message: "Data available",
				data: result
			})
		}
		else{
			return res.status(404).json({
				message: "Data not available",
				data: {}
			})
		}
	});
	
});


module.exports = router;