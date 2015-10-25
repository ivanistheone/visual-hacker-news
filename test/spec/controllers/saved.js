'use strict';

describe('Controller: SavedCtrl', function () {

  // load the controller's module
  beforeEach(module('visualHackerNewsApp'));

  var SavedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SavedCtrl = $controller('SavedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
