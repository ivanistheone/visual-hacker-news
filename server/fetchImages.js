"use strict";
var Firebase = require('firebase');
var latest = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
var http   = require('http');
var url    = require('url');
var kue    = require('kue');
var queue  = kue.createQueue({
	jobEvents: false,
	redis: process.env.REDIS_URL
});

function headReaquest(thumbUrl){
	var imageUrl = `https://hnews.xyz/thumbnail/?width=500&height=500&screen=1024&format=jpg&url=${thumbUrl}`;
	var srvUrl = url.parse(imageUrl);
	var options = {
		hostname:srvUrl.hostname,
		port:srvUrl.port,
		path:srvUrl.path,
		method:'HEAD'
	};
	var req = http.request(options, function(res) {
		// console.log(JSON.stringify(res.headers));
	  console.log('IMG=%s STATUS=%d',imageUrl,res.statusCode);
	});
	req.on('error', function(e) {
		console.error('Fail for :'+url+'\n',e.message);
	});

	req.end();
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

function run(){
	latest.on("child_changed", function(snapshot) {
		var inewsId = snapshot.val();
		// console.log(inewsId);
		getNewsUrl(inewsId).then(function(url){
			if (url.includes('[pdf]')) {return;}

			var job = queue.create('cacheImage', {url: url});

			job.removeOnComplete( true )
			.ttl(60*1000)
			.delay(1000)
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
	  },1500);

	});
}
module.exports = {
	run        : run,
	getNewsUrl :getNewsUrl
};