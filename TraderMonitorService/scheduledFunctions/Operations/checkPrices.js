const PriceLog = require('../../models/pricelog');

async function update(originalJSON, target, cryptoType, currencyType, timeOfNow){
	
	
    console.log("Getting "+cryptoType+" Price for "+(timeOfNow) + " " + new Date(timeOfNow).toString());
    // Add your custom logic here
	
	
	const api_address = process.env.COINBASE_PRICE_ROOT+""+"/"+cryptoType+"-"+currencyType+"/buy";
	const api_address_sell = process.env.COINBASE_PRICE_ROOT+""+"/"+cryptoType+"-"+currencyType+"/sell";
	
	var currentPriceSnap = {
		TargetCrypto: target,
		timestamp: timeOfNow,
		buy: null,
		sell: null
	};
	
	const merged_object = Object.assign({}, { quote: true});
	try{
		
		
		const buyData = await fetch(api_address, {
			method: "GET",
			parameter: JSON.stringify(merged_object)
		});
		
		//await buyData;
		
		
		var buyDataJSON = {};
		
		//console.log(response);
		if(buyData.status == 200){
			buyDataJSON = await buyData.json();
			//console.log(cryptoType + " JSON buy data: \n" + JSON.stringify(buyDataJSON));
			
			if(buyDataJSON == {}){
				return({});
			}
			else{
				currentPriceSnap.buy=buyDataJSON.data.amount;
			}
		}
		else{
			console.error("Price check for " + cryptoType +" failed");
			return({});
		}
		
		const sellData = await fetch(api_address_sell, {
			method: "GET",
			parameter: JSON.stringify(merged_object)
		});
		
		var sellDataJSON = {};
		
		if(sellData.status == 200){
			
			sellDataJSON = await sellData.json();
			
			//console.log(cryptoType + " JSON sell data: \n" + JSON.stringify(sellDataJSON));
			
			if(sellDataJSON == {}){
				return({});
			}
			else{
				
				currentPriceSnap.sell=sellDataJSON.data.amount;
				
				currentPriceSnap = Object.assign(originalJSON, currentPriceSnap);
				
				return(currentPriceSnap)
			}
			
		}
		else{
			console.error("Price check for " + cryptoType +" failed");
			return({});
		}
		
	} catch (error){
		console.log("Failed to load test data from "+api_address+"\n"+ error);
		return({});
	}
	
}

exports.update = update;
