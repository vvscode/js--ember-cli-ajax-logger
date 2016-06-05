/* global andThen, expect */
import Ember from 'ember';
import {test} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const {
  $: {ajax},
  A
} = Ember;
const HTTP_METHODS = ['GET', 'PUT', 'DELETE', 'POST'];

const singleInstanceCount = 1;
const countOfAssertions = 13;

moduleForAcceptance('Acceptance | logger');

test('Checking logged responses', function(assert) {
  expect(countOfAssertions);
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
      {
        responseText: '{\"body\":\"get is ok \"}',
        type: 'GET',
        url: '/fake-api/success'
      },
      {
        responseText: '{\"body\":\"get is failed \"}',
        type: 'GET',
        url: '/fake-api/fail'
      },
      {
        responseText: '{\"body\":\"put is ok \"}',
        type: 'PUT',
        url: '/fake-api/success'
      },
      {
        responseText: '{\"body\":\"put is failed \"}',
        type: 'PUT',
        url: '/fake-api/fail'
      },
      {
        responseText: '{\"body\":\"del is ok \"}',
        type: 'DELETE',
        url: '/fake-api/success'
      },
      {
        responseText: '{\"body\":\"del is failed \"}',
        type: 'DELETE',
        url: '/fake-api/fail'
      },
      {
        responseText: '{\"body\":\"post is ok \"}',
        type: 'POST',
        url: '/fake-api/success'
      },
      {
        responseText: '{\"body\":\"post is failed \"}',
        type: 'POST',
        url: '/fake-api/fail'
      }
    ];

    assert.deepEqual(log, shouldBeLog, 'Should contents as failed as success');

    const filteredShouldBe1 = [
      {
        responseText: '{\"body\":\"get is ok \"}',
        type: 'GET',
        url: '/fake-api/success'
      },
      {
        responseText: '{\"body\":\"del is ok \"}',
        type: 'DELETE',
        url: '/fake-api/success'
      }
    ];
    // to filter every fourth item
    const FOUR = 4;
    const ZERO = 0;
    /* jshint unused:false */
    window.emberCliAjaxLogger.setFilterFunction((item, index, _list) => index % FOUR === ZERO);
    const filteredList1 = JSON.parse(window.emberCliAjaxLogger.getSerialized()).map((item) => JSON.parse(item));
    assert.deepEqual(filteredList1, filteredShouldBe1, 'Should contents only filtered values');

    window.emberCliAjaxLogger.setFilterFunction(() => true);
    const nonFilteredLog = JSON.parse(window.emberCliAjaxLogger.getSerialized()).map((item) => JSON.parse(item));
    assert.deepEqual(nonFilteredLog, shouldBeLog, 'Should contents non-filtered values');

    /* jshint unused:false */
    const newFormattedLogShouldBe = [
      '{\"body\":\"get is ok \"}',
      '{\"body\":\"get is failed \"}',
      '{\"body\":\"put is ok \"}',
      '{\"body\":\"put is failed \"}',
      '{\"body\":\"del is ok \"}',
      '{\"body\":\"del is failed \"}',
      '{\"body\":\"post is ok \"}',
      '{\"body\":\"post is failed \"}'
    ];
    window.emberCliAjaxLogger.setGetItemForSerializer(({ xhr })=> xhr.responseText);
    const newFormattedLog = JSON.parse(window.emberCliAjaxLogger.getSerialized());
    assert.deepEqual(newFormattedLog, newFormattedLogShouldBe, 'Should allow change format on the fly');

    window.emberCliAjaxLogger.clear();
    assert.deepEqual(window.emberCliAjaxLogger.getSerialized(), '[]', 'Should clear log');
  });
});
