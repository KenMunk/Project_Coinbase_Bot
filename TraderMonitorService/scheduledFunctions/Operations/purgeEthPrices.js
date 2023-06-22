const CronJob = require("node-cron");
const PriceLog = require('../models/pricelog');

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("0 0 0 */2 * *", () => {
	
	const timeOfNow = (Date.now().valueOf())-(96*60*60000);
	
    console.log("Purging Eth Prices Older Than "+(timeOfNow) + " " + new Date(timeOfNow).toString());
    // Add your custom logic here
	
	
	
	const merged_object = Object.assign({}, { quote: true});
	try{
			
		PriceLog.deleteMany({timestamp: {$lt: timeOfNow}}).then(function(){
			
		}).catch(function(error){
			console.log(error);
		});
		
	} catch (error){
			console.log("Failed to load test data from "+api_address)
	}
		
}, []);
	
  

  scheduledJobFunction.start();
}