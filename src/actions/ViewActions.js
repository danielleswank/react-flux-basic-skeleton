var AppDispatcher = require('../dispatcher/AppDispatcher');
var APIUtils = require('../utils/APIUtils');

var ViewActions = {

  createRecord: function(data) {
    AppDispatcher.dispatch({
      actionType: 'CREATE_RECORD',
      data: data
    });
  },

  updateRecord: function(data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_RECORD',
      data: data
    });
  },

  removeRecord: function(id, shelfId) {
    AppDispatcher.dispatch({
      actionType: 'REMOVE_RECORD',
      data: {
       id: id,
       shelfId: shelfId
      }
    });
  },

  updateShelves: function(data) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_SHELVES',
      data: data
    });
  },

  moveRecord: function(recordId, fromShelfId, toShelfId, index) {
    AppDispatcher.dispatch({
      actionType: 'MOVE_RECORD',
      data: {
        recordId: recordId,
        fromShelfId: fromShelfId,
        toShelfId: toShelfId,
        index: index
      }
    });
  },

  reset: function() {
    AppDispatcher.dispatch({
      actionType: 'RESET'
    });
    APIUtils.getDefaultData();
  },
};

module.exports = ViewActions;