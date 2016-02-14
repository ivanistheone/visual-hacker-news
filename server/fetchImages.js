"use strict";
var Firebase = require('firebase');
var latest = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
var request   = require('request');
var url    = require('url');
var kue    = require('kue');
var queue  = kue.createQueue({
	jobEvents: false,
	redis: process.env.REDIS_URL
});

function headReaquest(thumbUrl){
	var imageUrl = `https://hnews.xyz/thumbnail/?width=500&height=500&screen=1024&format=jpg&url=${thumbUrl}`;
	var options = {
		url:imageUrl,
		method:'HEAD'
	};
	request(options, function(error, response, body) {
		// console.log(JSON.stringify(response.headers));
	  console.log('IMG=%s STATUS=%d CACHE=%s',imageUrl,response.statusCode, response.headers['cf-cache-status']);
	});
}


function getNewsUrl(newsItem) {
	// var deffer = new Deferred();
  var queryRef = new Firebase("https://hacker-news.firebaseio.com/v0/item/").child(newsItem);
  // return it as a synchronized object

  return new Promise(function(resolve, reject) {
  	queryRef.on("value", function(snapshot) {
  		var result = snapshot.val();
  	  // console.log(result);
  		if (result.url) {
	  		resolve(result.url);
  		} else {
  			reject(new Error('No url detected'));
  		}
  	}, function (errorObject) {
  	  console.log("The read failed: " + errorObject.code);
  	  reject(new Error(result));
  	});
  });
}

function flushDB(){
	var redis = require("redis"),
	    client = redis.createClient(process.env.REDIS_URL);
	client.flushall(function(err, replies){
		console.log("Flushing Redis:",err, replies);
		client.quit();
	});
}
function run(){
	flushDB();

	latest.on("child_changed", function(snapshot) {
		var inewsId = snapshot.val();
		// console.log(inewsId);
		getNewsUrl(inewsId).then(function(url){
			if (url.includes('[pdf]')) {return;}

			var job = queue.create('cacheImage', {url: url});

			job.removeOnComplete( true )
			.ttl(60*1000)
			.delay(200)
			.save( function(err){
			   	if( !err ) console.log( `Job Qued ${job.id}` );
			});
		})
	   ;
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	queue.process('cacheImage',function(job, done){
	  console.log(`Caching : ${job.data.url}`);
	  headReaquest(job.data.url);
	  setTimeout(function(){
		  done();
	  },200);

	});
}
module.exports = {
	run        : run,
	getNewsUrl :getNewsUrl
};