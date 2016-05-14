import Ember from 'ember';
import EmberCliAjaxLoggerInitializer from 'dummy/initializers/ember-cli-ajax-logger';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember cli ajax logger', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberCliAjaxLoggerInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
