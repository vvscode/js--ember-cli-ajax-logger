import Ember from 'ember';

const {
  $
} = Ember;

const log = [];
const addItem = (event, xhr, settings)=> log.push({ event, xhr, settings });

let getItemForSerializer;

let filterFunction = ()=> true;

const LoggerObject = {
  clear: ()=> (log.length = 0),

  getSerialized: ()=> JSON.stringify(log.filter(filterFunction).map(getItemForSerializer)),

  setFilterFunction(func) {
    if (typeof func === 'function') {
      filterFunction = func;
    }
  }
};

export function initLogger(options) {
  getItemForSerializer = options.getItemForSerializer;
  LoggerObject.setFilterFunction(options.filter);
  window[options.globalName] = LoggerObject;
  $(document).ajaxComplete((event, xhr, settings)=> addItem(event, xhr, settings));
}
