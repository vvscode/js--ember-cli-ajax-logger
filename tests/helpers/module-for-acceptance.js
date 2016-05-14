import {module} from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach(...args) {
      this.application = startApp();

      if (options.beforeEach) {
        options.beforeEach.apply(this, args);
      }
    },

    afterEach(...args) {
      if (options.afterEach) {
        options.afterEach.apply(this, args);
      }

      destroyApp(this.application);
    }
  });
}
