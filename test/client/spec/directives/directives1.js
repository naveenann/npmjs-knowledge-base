'use strict';

describe('Directive: directives1', function () {

  // load the directive's module
  beforeEach(module('kbv1App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<directives1></directives1>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the directives1 directive');
  }));
});
