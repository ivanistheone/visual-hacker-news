"use strict";
var Firebase = require('firebase');
var latest   = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
var http     = require('http');
var url      = require('url');

var headReaquest = function(imageUrl){
	var srvUrl = url.parse(imageUrl);
	var options = {
		hostname:srvUrl.hostname,
		port:srvUrl.port,
		path:srvUrl.path,
		method:'HEAD'
	};
	var req = http.request(options, function(res) {
		// console.log(JSON.stringify(res.headers));
	  console.log('IMG=%s STATUS=%d UPTIME=%s',imageUrl,res.statusCode,process.uptime());
	});
	req.on('error', function(e) {
		console.error('Fail for :'+url+'\n',e.message);
	});

	req.end();
};

var getNewsUrl = function(newsItem) {
	// var deffer = new Deferred();
  var queryRef = new Firebase("https://hacker-news.firebaseio.com/v0/item/").child(newsItem);
  // return it as a synchronized object

  return new Promise(function(resolve, reject) {
  	queryRef.on("value", function(snapshot) {
  		var result = snapshot.val();
  		if (result.url) {
	  		var imgUrl = `http://api.webthumbnail.org?width=500&height=500&screen=1024&format=jpg&url=${result.url}`;
	  		// console.log(imgUrl);
	  		resolve(imgUrl);
  	 //  console.log(result);
  		} else {
  			reject(new Error('No url detected'));
  		}
  	}, function (errorObject) {
  	  console.log("The read failed: " + errorObject.code);
  	  reject(new Error(result));
  	});
  });
};
var run = function(){
	latest.on("child_added", function(snapshot) {
		var inewsId = snapshot.val();
		getNewsUrl(inewsId).then(function(imgUrl){
			headReaquest(imgUrl);
		})
	   ;
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}
module.exports = {
	run        : run,
	getNewsUrl :getNewsUrl
};