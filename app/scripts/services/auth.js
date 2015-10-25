'use strict';

/**
 * @ngdoc service
 * @name visualHackerNewsApp.auth
 * @description
 * # auth
 * Factory in the visualHackerNewsApp.
 */
angular.module('visualHackerNewsApp')
  .factory('Auth', function (FBURL,$firebaseAuth) {
    var ref = new Firebase(FBURL);
    var $ref = $firebaseAuth(ref);
    return {
      "ref" : $ref,
      "login" : function(){
        return $ref.$authWithOAuthPopup("twitter");
      },
      "check" : function(cb){
        $ref.$onAuth(cb);
      },
      "logout" : function() {
        return $ref.$unauth();
      }
    };
  });
