'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.bookmark
 * @description
 * # bookmark
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('bookmark', function (FBURL,$firebaseObject,$firebaseArray,$firebaseUtils) {
    var users = new Firebase(FBURL+"/users");
    

    var meaningOfLife = 42;

    // Public API here
    return {
      add: function (item, uuid) {
        
        // var $bookmarks = $firebaseObject(users.child(uuid).child("bookmarks").child(item.id));
        // $bookmarks.$loaded(function(result){
        //   console.log(result)
        //   $bookmarks=item;
        //   $bookmarks.$save();
        // });
        var bookmarkRef = users.child(uuid).child("bookmarks").child(item.id);
        bookmarkRef.transaction(function(currentData) {
          var data = angular.fromJson(angular.toJson(item));
          if (currentData === null) {

            console.log(data);
            return data;
          }
        });
      },
      read: function(uuid){
        var $bookmarks = $firebaseArray(users.child(uuid).child("bookmarks"));
        return $bookmarks.$loaded();
      }
    };
  });
