

export type queryOptions = {
	defaultValue?: any;
	successMessage?: string;
	failMessage?: string;
	callbackOp: {};
	debugMode?: boolean;
	targetField?: string;
	queryPath: string;
	queryHeader: {};
}


export async function RunQuery(options: queryOptions){
	try{
		let response = await fetch(
			options.queryPath,
			options.queryHeader
		);
		
		let responseData = await response.json();
		
		if(response.status == 200){
			if(options.successMessage && options.debugMode){
				console.log(options.successMessage+"\n"+JSON.stringify(responseData));
			}
		}else{
			if(options.failMessage && options.debugMode){
				console.log(options.failMessage);
			}
		}
		
		let callbackPayload = {
			status: response.status,
		}
		
		if('targetField' in options){
			console.log("Target Field is " + options.targetField);
			callbackPayload.data = responseData[options.targetField];
		}
		else{
			callbackPayload.data = responseData;
		}
		options.callbackOp(callbackPayload);
	}
	catch(error){		
		if(options.failMessage && options.debugMode){
			console.log(options.failMessage+"\n"+error);
		}
	}
}