
type queryOptions = {
	defaultValue?: any;
	successMessage?: string;
	failMessage?: string;
	callbackOp?: any;
	debugMode?: boolean;
	targetField?: string;
}


export async function RunQuery(queryPath: string, queryHeader: {}, options: queryOptions){
	try{
		let response = await fetch(
			queryPath,
			queryHeader
		);
		
		let responseData = await response.json();
		
		if(response.status == 200){
			if(options.successMessage && options.debugMode){
				console.log(options.successMessage+"\n"+responseData);
			}
		}else{
			if(options.failMessage && options.debugMode){
				console.log(options.failMessage);
			}
		}
		
		let callbackPayload = {
			status: response.status,
		}
		
		if(options.callbackOp){
			if(options.targetField){
				callbackPayload.data = responseData[options.targetField];
			}
			else{
				callbackPayload.data = responseData;
			}
			options.callbackOp(callbackPayload);
		}
	}
	catch(error){		
		if(options.failMessage && options.debugMode){
			console.log(options.failMessage+"\n"+error);
		}
	}
}