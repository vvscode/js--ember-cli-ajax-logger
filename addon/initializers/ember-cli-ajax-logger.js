import Ember from 'ember';
import { initLogger } from '../util/ember-cli-ajax-logger';

const {
  get,
  merge
} = Ember;

export const defaultOptions = {
  disabled: false,
  globalName: 'emberCliAjaxLogger',
  getItemForSerializer: ({ _event, xhr, settings })=> {
    const { type, data, url } = settings;

    return JSON.stringify({
      url,
      type,
      data,
      responseText: xhr.responseText
    });
  }
};

export function initialize(application) {
  let config;

  if (typeof application.resolveRegistration === 'function') {
    config = application.resolveRegistration('config:environment');
  } else if (typeof application.registry.resolve === 'function') {
    config = application.registry.resolve('config:environment');
  } else {
    // workaround for old projects
    /* global requirejs */
    const configName = Object.keys(requirejs.entries).find((item)=> item.match(/config\/environment/));

    config = (requirejs(`${configName}`) || {}).default;
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
