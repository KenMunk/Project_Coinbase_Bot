const express = require('express');
const TargetCrypto = require('../models/TargetCrypto');

const router = express.Router();

router.all('/add/target/:crypto/currency/:currency', (req, res) => {
	
	console.log("Attempting to add " + JSON.stringify(req.params) + " to list");
	const cryptoString = req.params.crypto+"";
	const currencyString = req.params.currency+"";
	
	const targetData = {crypto: cryptoString, currency: currencyString};
	
	const preCheck = TargetCrypto.find({crypto: cryptoString, currency: currencyString}).then(function(doc){
		if(doc.length == 0){
			const newTarget = new TargetCrypto(targetData);
			
			newTarget.save();
			
			
			return res.status(200).json({message: JSON.stringify(targetData) + " saved"});
		}
		return res.status(200).json({message: JSON.stringify(targetData) + " exists"});
	}).catch((error) => function(error){
		
		
		console.error("Failed to check for " + JSON.stringify(targetData));
		return res.status(500).json({message: "Failed to check for " + JSON.stringify(targetData)}); 
	});
	
});

module.exports = router;