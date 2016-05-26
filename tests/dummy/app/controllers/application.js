import Ember from 'ember';

const {
  on,
  computed
} = Ember;

const HTTP_METHODS = ['GET', 'PUT', 'DELETE', 'POST'];

export default Ember.Controller.extend({
  emberCliAjaxLog: computed(function() {
    return JSON.parse(window.emberCliAjaxLogger.getSerialized());
  }),

  makeRequests: on('init', function() {
    HTTP_METHODS.forEach((method) => {
      $.ajax({
        url: '/fake-api/success',
        method
      })
      .always(() => this.notifyPropertyChange('emberCliAjaxLog'));

      $.ajax({
          url: '/fake-api/fail',
          method
        })
        .always(() => this.notifyPropertyChange('emberCliAjaxLog'));
    });
  })
});
