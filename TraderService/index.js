const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("I will be shown on the Browser");
    console.log("I will be shown on the Terminal");
});

const scheduledFunctions = require('./scheduledFunctions/testscheduled');

scheduledFunctions.initScheduledJobs();

app.listen(3000);