const CronJob = require("node-cron");
const PriceLog = require('../models/pricelog');

exports.initScheduledJobs = (cryptoType) => {
  const scheduledJobFunction = CronJob.schedule("*/5 * * * * *", () => {
	
	const timeOfNow = (Date.now().valueOf())
	
    console.log("Getting Eth Price for "+(timeOfNow) + " " + new Date(timeOfNow).toString());
    // Add your custom logic here
	
	const api_address = process.env.COINBASE_PRICE_ROOT+""+"/ETH-USD/buy";
	const api_address_sell = process.env.COINBASE_PRICE_ROOT+""+"/ETH-USD/sell";
	
	const currentPriceSnap = {
		crypto: "ETH",
		currency: "USD",
		timestamp: timeOfNow,
		buy: null,
		sell: null,
		sma30: 0,
		sma60: 0,
		sma90: 0,
		opportunity: "potential buy",
		datasufficient: "no"
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
					
					const history = PriceLog.find({timestamp: {$gte: timeOfNow-90*60000}, crypto: "ETH",
					currency: "USD"}).then(function(doc90){
						console.log("History is "+doc90.length+ " entries");
						
						if(doc90.length > 0){
							
							if(doc90.length > 500){
								currentPriceSnap.datasufficient = "sufficient";
							}
							//*
							doc90.forEach((currentValue, index) => {
								currentPriceSnap.sma90 +=currentValue.sell;
							});
							
							currentPriceSnap.sma90 /= doc90.length;
							
							const history = PriceLog.find({timestamp: {$gte: timeOfNow-60*60000}, crypto: "ETH",
							currency: "USD"}).then(function(doc60){
								console.log("History is "+doc60.length+ " entries");
								
								doc60.forEach((currentValue, index) => {
									currentPriceSnap.sma60 +=currentValue.sell;
								});
								
								currentPriceSnap.sma60 /= doc60.length;
								
								const history = PriceLog.find({timestamp: {$gte: timeOfNow-30*60000}, crypto: "ETH",
								currency: "USD"}).then(function(doc30){
									console.log("History is "+doc30.length+ " entries");
									
									//*
									doc30.forEach((currentValue, index) => {
										currentPriceSnap.sma30 +=currentValue.sell;
									});
									
									currentPriceSnap.sma30 /= doc30.length;
									
									const history = PriceLog.find({timestamp: {$gte: timeOfNow-2.2*60000}, crypto: "ETH",
									currency: "USD"}).then(function(doc){
										console.log("History is "+doc.length+ " entries");
										
										
										
										doc.forEach((currentValue, index) => {
											if(
												currentValue.sma30 > currentValue.sell ||
												currentValue.sma60 > currentValue.sell ||
												currentValue.sma90 > currentValue.sell 
											){
												currentPriceSnap.opportunity = "potential sell";
											}
										});
										
										console.log(currentPriceSnap);
										const newEntry = new PriceLog(currentPriceSnap);
										newEntry.save();
										
									});
									
								});
							});
						}
						else{
							currentPriceSnap.sma90 = currentPriceSnap.sell;
							currentPriceSnap.sma30 = currentPriceSnap.sell;
							currentPriceSnap.sma60 = currentPriceSnap.sell;
							console.log(currentPriceSnap);
							const newEntry = new PriceLog(currentPriceSnap);
							newEntry.save();
						}
						
						
					});
					
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