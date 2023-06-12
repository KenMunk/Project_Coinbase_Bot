const CronJob = require("node-cron");
const PriceLog = require('../models/pricelog');

exports.initScheduledJobs = () => {
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
		sma30: null,
		sma60: null,
		sma90: null,
		opportunity: "no",
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
					
					
					const history = PriceLog.find({timestamp: {$gte: timeOfNow-90*60000/5}, crypto: "ETH",
					currency: "USD"}).then(function(doc){
						console.log("History is "+doc.length+ " entries");
						
						currentPriceSnap.sma90 = 0;
						currentPriceSnap.sma30 = 0;
						currentPriceSnap.sma60 = 0;
						//*
						doc.forEach((currentValue, index) => {
							currentPriceSnap.sma90 +=currentValue.sell;
						});
						
						currentPriceSnap.sma90 /= doc.length;
						
						history30 = doc.filter((currentValue) => {
							return currentValue.timestamp >timeOfNow - (30*60000/5 )
						});
						
						console.log("History is "+history30.length+ " entries");
						
						history30.forEach((currentValue, index) => {
							currentPriceSnap.sma30 = currentPriceSnap.sma30+currentValue.sell;
						});
						
						currentPriceSnap.sma30 /= history30
						.length;
						
						history60 = doc.filter((currentValue) => {
							return currentValue.timestamp >timeOfNow - (60*60000/5)
						});
						
						console.log("History is "+history60.length+ " entries");
						
						history60.forEach((currentValue, index) => {
							currentPriceSnap.sma60 = currentPriceSnap.sma60+currentValue.sell;
						});
						
						currentPriceSnap.sma60 /= history60
						.length;
						//*/
						if(doc.length+0 > 1000){
							
							currentPriceSnap.datasufficient = "sufficient";
							
						}
						
						if(currentPriceSnap.sma30 < currentPriceSnap.sell && currentPriceSnap.sma60 < currentPriceSnap.sell && currentPriceSnap.sma90 < currentPriceSnap.sell){
							currentPriceSnap.opportunity = "potential";
						}
						
						console.log(currentPriceSnap);
						const newEntry = new PriceLog(currentPriceSnap);
						newEntry.save();
						
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