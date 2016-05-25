# Ember-cli-ajax-logger [![Travis CI Build Status](https://api.travis-ci.org/vvscode/js--ember-cli-ajax-logger.svg)

This simple ember-cli addon add ability to log ajax requests inside application.

##Motivation
Add access to requests/responses logs while intergration testing with Selenium. 

#Configuration

Default configuration is
```javascript
{
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
}
```

It's a part of env-config (section 'ember-cli-ajax-logger' in  config/environment.js )

```javascript
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
    },

    APP: {

    },

    'ember-cli-ajax-logger': {
      globalName: 'emberCliAjaxLogger'
    }
  };


  return ENV;
};
```
