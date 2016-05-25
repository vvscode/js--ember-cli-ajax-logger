import Ember from 'ember';
import {initLogger} from '../util/ember-cli-ajax-logger';

const {
  get,
  merge
} = Ember;

export const defaultOptions = {
  disabled: false,
  globalName: 'emberCliAjaxLogger',
  getItemForSerializer: (event, jqXHR, ajaxOptions)=> {
    const { type, data, url } = ajaxOptions;
    return JSON.stringify({
      url,
      type,
      data,
      responseText: jqXHR.responseText
    });
  }
};

export function initialize(application) {
  let config;

  if (typeof application.resolveRegistration === 'function') {
    config = application.resolveRegistration('config:environment');
  } else {
    config = application.registry.resolve('config:environment');
  }
  const customOptions = get(config || {}, 'ember-cli-ajax-logger') || {};
  const options = merge(defaultOptions, customOptions);

  if (!get(options, 'disabled')) {
    initLogger(options);
  }
}

export default {
  name: 'ember-cli-ajax-logger',
  initialize
};
