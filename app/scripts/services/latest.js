'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.latest
 * @description
 * # latest
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('latest', function ($firebaseArray) {

    return {
    	topstories:function() {
    		// create a reference to the user's profile
    		var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
    		// return it as a synchronized object
    		return $firebaseArray(ref);
    	},
    	newstories:function() {
    		// create a reference to the user's profile
    		var ref = new Firebase("https://hacker-news.firebaseio.com/v0/newstories");
    		// return it as a synchronized object
    		return $firebaseArray(ref);
    	},
    	showstories:function() {
    		// create a reference to the user's profile
    		var ref = new Firebase("https://hacker-news.firebaseio.com/v0/showstories");
    		// return it as a synchronized object
    		return $firebaseArray(ref);
    	},
    }
});

