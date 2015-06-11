var AppDispatcher = require('../dispatcher/AppDispatcher');

var ServerActions = {

  loadShelves: function(data) {
    AppDispatcher.dispatch({
      actionType: 'LOAD_SHELVES',
      data: data
    });
  },

  loadRecords: function(data) {
    AppDispatcher.dispatch({
      actionType: 'LOAD_RECORDS',
      data: data
    });
  }

};

module.exports = ServerActions;