'use strict';

/**
 * @ngdoc function
 * @name visualHackerNewsApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the visualHackerNewsApp
 */
angular.module('visualHackerNewsApp')
  .component('navigation', {
    bindings: {
      title    : '@',
      loggedIn : '<',
      user     : '<'
    },
    transclusion:false,
    controller : function ($rootScope,Auth) {
      this.login = function() {
        $rootScope.err = null;
        Auth.login()
          .then(function(authData) {
            $rootScope.user = authData;
            console.log("Logged in as:", authData.uid);
          }).catch(function(error) {
            console.error("Authentication failed:", error);
            $rootScope.err = error;
          });
      };
      this.logout = Auth.logout;
    },
    templateUrl:"scripts/components/navigation/navigation.html"
  });
