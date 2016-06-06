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
  },

  setGetItemForSerializer(func) {
    if (typeof func === 'function') {
      getItemForSerializer = func;
    }
  }
};

export function initLogger(options) {
  LoggerObject.setGetItemForSerializer(options.getItemForSerializer);
  LoggerObject.setFilterFunction(options.filter);
  window[options.globalName] = LoggerObject;
  $(document).ajaxComplete(addItem);
}
