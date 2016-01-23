var kue = require('kue');
var express = require('express');
var ui = require('kue-ui');
var app = express();

// connect kue to appropriate redis, or omit for default localhost

var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

ui.setup({
    apiURL: '/api', // IMPORTANT: specify the api url
    baseURL: '/kue', // IMPORTANT: specify the base url
    updateInterval: 5000 // Optional: Fetches new data every 5000 ms
});

// Mount kue JSON api
app.use('/api', kue.app);
// Mount UI
app.use('/kue', ui.app);
app.use('/process/:job', function(req, res, next){
	queue.process(req.params.job,100,function(job, done){
	  console.log(job.data);
	  done();
	});
	res.send('Processing...');
});
app.use('/cleanComplete/:job', function(req, res, next){
	// console.log(queue);
	  kue.Job.rangeByType(req.params.job, 'complete', 0, -1, 'asc', function (err, selectedJobs) {
	    selectedJobs.forEach(function (job) {
	        job.remove();
	    });
	  });

	res.send('Processing...');
});

app.listen(3000);