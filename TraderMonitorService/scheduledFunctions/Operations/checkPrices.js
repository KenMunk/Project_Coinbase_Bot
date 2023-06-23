const PriceLog = require('../../models/pricelog');

exports.updatePrice = (target, cryptoType, currencyType, timeOfNow) =>{
	
    console.log("Getting "+cryptoType+" Price for "+(timeOfNow) + " " + new Date(timeOfNow).toString());
    // Add your custom logic here
	
	const api_address = process.env.COINBASE_PRICE_ROOT+""+"/"+cryptoType+"-"+currencyType+"/buy";
	const api_address_sell = process.env.COINBASE_PRICE_ROOT+""+"/"+cryptoType+"-"+currencyType+"/sell";
	
	const currentPriceSnap = {
		TargetCrypto: target,
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
			try{
				if(response.status == 200){
					const jsonData = response.json();
					console.log(cryptoType + " JSON data: \n" + jsonData);
					return(jsonData);
				}
				else{
					console.error("Price check for " + cryptoType +" failed");
					return({});
				}
			}
			catch(error){
				return({});
			}
		})
		.then(data => {
			
			//console.log("Successfully loaded test data from "+api_address)
			//console.log(data);
			if(data == {}){
				return;
			}
			else{
					
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
						
						currentPriceSnap.sell=data.data.amount;
						
						//*
						
						console.log(currentPriceSnap);
						const newEntry = new PriceLog(currentPriceSnap);
						newEntry.save()
						//*/
						
					});
				} catch (error){
						console.log("Failed to load test data from "+api_address)
				}
			}
			
			
		});
	} catch (error){
			console.log("Failed to load test data from "+api_address)
	}
}

