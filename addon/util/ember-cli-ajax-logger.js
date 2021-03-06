import Ember from 'ember';

const {
  $
} = Ember;

const log = [];
let isEnabled = false;
const addItem = (event, xhr, settings)=> Boolean(isEnabled) && log.push({ event, xhr, settings });
let getItemForSerializer = ()=> 'item';
let filterFunction = ()=> true;

const LoggerObject = {
  clear: ()=> {
    log.length = 0;

    return LoggerObject;
  },

  getSerialized: ()=> JSON.stringify(log.filter(filterFunction).map(getItemForSerializer)),

  setFilterFunction(func) {
    if (typeof func === 'function') {
      filterFunction = func;
    }

    return LoggerObject;
  },

  setGetItemForSerializer(func) {
    if (typeof func === 'function') {
      getItemForSerializer = func;
    }

    return LoggerObject;
  },

  register(name) {
    window[name] = LoggerObject;

    return LoggerObject;
  },

  subscribe() {
    $(document).ajaxComplete(addItem);

    return LoggerObject;
  },

  enableLogging() {
    isEnabled = true;

    return LoggerObject;
  },

  disableLogging() {
    isEnabled = false;

    return LoggerObject;
  }
};

export function initLogger(options) {
  LoggerObject
    .setGetItemForSerializer(options.getItemForSerializer)
    .setFilterFunction(options.filter)
    .register(options.globalName)
    .subscribe()
    .enableLogging();
}
