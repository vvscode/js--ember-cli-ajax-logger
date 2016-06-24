# Ember-cli-ajax-logger ![Travis CI Build Status](https://api.travis-ci.org/vvscode/js--ember-cli-ajax-logger.svg)

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

Option `globalName` set the window property which contains logger object. 

#API

To use logger instance you should use `window[globalName]` by default it's `window.emberCliAjaxLogger`.

Logger instance has next interface ( most of functions return logger instance thus you can use chain constructions )

- `clear` - clear log. Return logger instance
- `getSerialized` - return string which is serialized array build by item process function
- `setFilterFunction` - set filter function which allow control list of items in `getSerialized`result. Takes callback as param. Callbak receive log items, index and log list ( tipical for `[].filter` in js ). Return logger instance
- `setGetItemForSerializer` - set process function which use to build output for `getSerialized` method. Takes callback as param. Callbak receive log items, index and log list ( tipical for `[].map` in js ). Return logger instance
- `register` - add link into global namespace ( `window` ). Takes string with name to register as param. Return logger instance
- `subscribe` - enable subscription via `$.ajaxComplete` to add handler from logger instance. Return logger instance
- `enableLogging` - enable logging ( by default `subscribe` enable handler, but not add item into log. Return logger instance
- `disableLogging` - disable logging. Return logger instance

## Example
Example ( from addon's initializer ) of usage

```javascript
    LoggerObject
      .setGetItemForSerializer(({ _event, xhr, settings })=> {
	    const { type, data, url } = settings;
	    return JSON.stringify({
	      url,
	      type,
	      data,
	      responseText: xhr.responseText
	    });
	  })
      .setFilterFunction((_item)=> true) // no filtering
      .register('emberCliAjaxLogger')
      .subscribe()
      .enableLogging();
```

Also you can check existing tests here: https://github.com/vvscode/js--ember-cli-ajax-logger/blob/master/tests/acceptance/logger-test.js
