'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.latest
 * @description
 * # latest
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('latest', function ($firebase) {
    // create a reference to the user's profile
    var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
    // return it as a synchronized object
    return $firebase(ref).$asObject();
});

