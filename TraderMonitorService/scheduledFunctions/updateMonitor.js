const CronJob = require("node-cron");
const TargetCrypto = require('../models/TargetCrypto');

exports.initScheduledJobs = (updateInterval) => {
	const scheduledJobFunction = CronJob.schedule(""+updateInterval,() => {
		
		const timeOfNow = (Date.now().valueOf())
		
		try{
			
			
			TargetCrypto.find().then(function(doc){
				
				if(doc.length == 0){
					
					
					console.error("Scheduled job UpdateMonitor failed at " + timeOfNow.toString() + " because nothing is being tracked");
					
				}
				else{
					
					console.log(doc);
					
				}
				
			}).catch((error) => function(error){
				
				
				console.error("Scheduled job UpdateMonitor failed at " + timeOfNow.toString() + " when getting tracked currencies for error: \n"+error);
				
			});
			
		}catch(error){
			
			console.error("Scheduled job UpdateMonitor failed at " + timeOfNow.toString() + " for error: \n"+error);
			
		}
		
	}, []);
	
	scheduledJobFunction.start();
}