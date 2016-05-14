import Ember from 'ember';

const {
  $
} = Ember;

const log = [];
const addItem = (event, xhr, settings) => log.push({event, xhr, settings});

let getItemForSerializer;

const LoggerObject = {
  clear: () => log.length = 0,

  getSerialized: () => JSON.stringify(log.map(getItemForSerializer))
};

export function initLogger(options) {
  getItemForSerializer = options.getItemForSerializer;
  window[options.globalName] = LoggerObject;
  $(document).ajaxComplete((event, xhr, settings) => addItem({event, xhr, settings}));
}
