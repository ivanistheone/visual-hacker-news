'use strict';

describe('Service: latest', function () {

  // load the service's module
  beforeEach(module('visualHackerNewsApp'));

  // instantiate service
  var latest;
  beforeEach(inject(function (_latest_) {
    latest = _latest_;
  }));

  it('should do something', function () {
    expect(!!latest).toBe(true);
  });

});
