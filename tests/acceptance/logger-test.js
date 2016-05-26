/* global andThen, expect */
import Ember from 'ember';
import {test} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const {
  $: { ajax },
  A
} = Ember;
const HTTP_METHODS = ['GET', 'PUT', 'DELETE', 'POST'];

const singleInstanceCount = 1;

moduleForAcceptance('Acceptance | logger');

test('visiting /logger', function(assert) {
  expect(10);
  HTTP_METHODS.forEach((method) => {
    ajax({
      url: '/fake-api/success',
      method
    });

    andThen(function() {
      const log = new A(JSON.parse(window.emberCliAjaxLogger.getSerialized()).map((item) => JSON.parse(item)));
      const records = new A(log.filterBy('type', method)).filterBy('url', '/fake-api/success');
      assert.equal(records.length, singleInstanceCount, 'Should log success response');
    });

    ajax({
      url: '/fake-api/fail',
      method
    });

    andThen(function() {
      const log = new A(JSON.parse(window.emberCliAjaxLogger.getSerialized()).map((item) => JSON.parse(item)));
      const records = new A(log.filterBy('type', method)).filterBy('url', '/fake-api/fail');
      assert.equal(records.length, singleInstanceCount, 'Should log success response');
    });
  });

  andThen(function() {
    const log = JSON.parse(window.emberCliAjaxLogger.getSerialized()).map((item) => JSON.parse(item));
    const shouldBeLog = [
      { url: '/fake-api/success', type: 'GET', responseText: '{\"body\":\"get is ok \"}' },
      { url: '/fake-api/fail', type: 'GET', responseText: '{\"body\":\"get is failed \"}' },
      { url: '/fake-api/success', type: 'PUT', responseText: '{\"body\":\"put is ok \"}' },
      { url: '/fake-api/fail', type: 'PUT', responseText: '{\"body\":\"put is failed \"}' },
      { url: '/fake-api/success', type: 'DELETE', responseText: '{\"body\":\"del is ok \"}' },
      { url: '/fake-api/fail', type: 'DELETE', responseText: '{\"body\":\"del is failed \"}' },
      { url: '/fake-api/success', type: 'POST', responseText: '{\"body\":\"post is ok \"}' },
      { url: '/fake-api/fail', type: 'POST', responseText: '{\"body\":\"post is failed \"}' }
    ];

    assert.deepEqual(log, shouldBeLog, 'Shoud contents as failes as success');
    window.emberCliAjaxLogger.clear();
    assert.deepEqual(window.emberCliAjaxLogger.getSerialized(), '[]', 'Shoud clear log');

  });
});
