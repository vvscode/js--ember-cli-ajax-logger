import Ember from 'ember';

const {
  $
} = Ember;

const log = [];
const addItem = (event, xhr, settings)=> log.push({ event, xhr, settings });

let getItemForSerializer = ()=> 'item';

let filterFunction = ()=> true;

const LoggerObject = {
  clear: ()=> (log.length = 0),

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
  }
};

export function initLogger(options) {
  LoggerObject
    .setGetItemForSerializer(options.getItemForSerializer)
    .setFilterFunction(options.filter)
    .register(options.globalName)
    .subscribe();
}
