const CronJob = require("node-cron");
const PriceLog = require('../models/pricelog');

exports.initScheduledJobs = (cryptoType, currencyType, updateInterval) => {
  const scheduledJobFunction = CronJob.schedule(""+updateInterval, () => {
	
	const timeOfNow = (Date.now().valueOf())
	
    console.log("Getting "+cryptoType+" Price for "+(timeOfNow) + " " + new Date(timeOfNow).toString());
    // Add your custom logic here
	
	const api_address = process.env.COINBASE_PRICE_ROOT+""+"/"+cryptoType+"-"+currencyType+"/buy";
	const api_address_sell = process.env.COINBASE_PRICE_ROOT+""+"/"+cryptoType+"-"+currencyType+"/sell";
	
	
	const currentPriceSnap = {
		crypto: cryptoType,
		currency: "USD",
		timestamp: timeOfNow,
		buy: null,
		sell: null
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
			
		const userData = fetch(api_address, {
			method: "GET",
			parameter: JSON.stringify(merged_object)
		})
		.then(response => {
			//console.log(response);
			return(response.json());
		})
		.then(data => {
			
			//console.log("Successfully loaded test data from "+api_address)
			//console.log(data);
			currentPriceSnap.buy=data.data.amount;
			
			try{
					
				const userData = fetch(api_address_sell, {
					method: "GET",
					parameter: JSON.stringify(merged_object)
				})
				.then(response => {
					//console.log(response);
					return(response.json());
				})
				.then(data => {
					
					//console.log("Successfully loaded test data from "+api_address)
					//console.log(data);
					currentPriceSnap.sell=data.data.amount;
					
					/*
					const history = PriceLog.find({timestamp: {$gte: timeOfNow-5*90*60000}, crypto: cryptoType,
					currency: currencyType}).then(function(doc90){
						//console.log("History is "+doc90.length+ " entries");
						
						if(doc90.length > 0){
							
							currentPriceSnap.datasufficient = doc90.length;
							
							//*
							doc90.forEach((currentValue, index) => {
								currentPriceSnap.sma90 +=currentValue.sell;
							});
							
							currentPriceSnap.sma90 /= doc90.length;
							
							const history = PriceLog.find({timestamp: {$gte: timeOfNow-5*60*60000}, crypto: cryptoType,
							currency: currencyType}).then(function(doc60){
								//console.log("History is "+doc60.length+ " entries");
								
								doc60.forEach((currentValue, index) => {
									currentPriceSnap.sma60 +=currentValue.sell;
								});
								
								currentPriceSnap.sma60 /= doc60.length;
								
								const history = PriceLog.find({timestamp: {$gte: timeOfNow-5*30*60000}, crypto: cryptoType,
								currency: currencyType}).then(function(doc30){
									//console.log("History is "+doc30.length+ " entries");
									
									//*
									doc30.forEach((currentValue, index) => {
										currentPriceSnap.sma30 +=currentValue.sell;
									});
									
									currentPriceSnap.sma30 /= doc30.length;
									
									const history = PriceLog.find({timestamp: {$gte: timeOfNow-5*10*60000}, crypto: cryptoType,
									currency: currencyType}).then(function(doc10){
										//console.log("History is "+doc10.length+ " entries");
										
										//*
										doc10.forEach((currentValue, index) => {
											currentPriceSnap.sma10 +=currentValue.sell;
										});
										
										currentPriceSnap.sma10 /= doc10.length;
										
										
										const history = PriceLog.find({timestamp: {$gte: timeOfNow-5*5*60000}, crypto: cryptoType,
										currency: currencyType}).then(function(doc5){
											//console.log("History is "+doc5.length+ " entries");
											
											//*
											doc5.forEach((currentValue, index) => {
												currentPriceSnap.sma5 +=currentValue.sell;
											});
											
											currentPriceSnap.sma5 /= doc5.length;
											
											const history = PriceLog.find({timestamp: {$gte: timeOfNow-6*60*60000}, crypto: cryptoType,
											currency: currencyType}).then(function(doc){
												//console.log("History is "+doc.length+ " entries");
												
												
												//The closer the opportunity score is to zero, the better the prospect to buy
												
												if(
													currentPriceSnap.sma5 > currentPriceSnap.sell 
												){
													currentPriceSnap.opportunityNow += 1;
												}
												if(
													currentPriceSnap.sma10 > currentPriceSnap.sell 
												){
													currentPriceSnap.opportunityNow += 10;
												}
												if(
													currentPriceSnap.sma30 > currentPriceSnap.sell 
												){
													currentPriceSnap.opportunityNow += 100;
												}
												if(
													currentPriceSnap.sma60 > currentPriceSnap.sell 
												){
													currentPriceSnap.opportunityNow += 1000;
												}
												if(
													currentPriceSnap.sma90 > currentPriceSnap.sell 
												){
													currentPriceSnap.opportunityNow += 10000;
												}
												doc.forEach((currentValue, index) => {
													if(
														currentValue.sma30 > currentValue.sell 
													){
														currentPriceSnap.opportunity += 1;
													}
													if(
														currentValue.sma60 > currentValue.sell 
													){
														currentPriceSnap.opportunity += 1;
													}
													if(
														currentValue.sma90 > currentValue.sell 
													){
														currentPriceSnap.opportunity += 1;
													}
												});
												
												console.log(currentPriceSnap);
												const newEntry = new PriceLog(currentPriceSnap);
												newEntry.save();
												
											});
											
										});
										
									});
									
								});
							});
						}
						else{
							currentPriceSnap.sma90 = currentPriceSnap.sell;
							currentPriceSnap.sma30 = currentPriceSnap.sell;
							currentPriceSnap.sma10 = currentPriceSnap.sell;
							currentPriceSnap.sma5 = currentPriceSnap.sell;
							currentPriceSnap.sma60 = currentPriceSnap.sell;
							console.log(currentPriceSnap);
							const newEntry = new PriceLog(currentPriceSnap);
							newEntry.save();
						}
						
						
					});
					//*/
					
					//*
					
					console.log(currentPriceSnap);
					const newEntry = new PriceLog(currentPriceSnap);
					newEntry.save()
					//*/
					
				});
			} catch (error){
					console.log("Failed to load test data from "+api_address)
			}
			
		});
	} catch (error){
			console.log("Failed to load test data from "+api_address)
	}
		
}, []);
	
  

  scheduledJobFunction.start();
}