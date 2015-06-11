var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _records = {};

function create(data) {
  _records[data.id] = data;
}

function createAll(data) {
  for (var i = 0; i < data.length; i++) {
    var record = data[i];
    _records[record.id] = record;
  }
}

function update(data) {
  var id = data.id;
  _records[id] = assign({}, _records[id], data);
}

function remove(id) {
  delete _records[id];
}

function removeAll() {
  var _records = {};
}

var RecordStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _records;
  },

  get: function(id) {
    return _records[id];
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

// Register callback to handle all updates
RecordStore.dispatchToken = AppDispatcher.register(function(action) {
  var data = action.data;

  switch(action.actionType) {
    case 'CREATE_RECORD':
      create(data);
      break;

    case 'UPDATE_RECORD':
      update(data);
      break;

    case 'LOAD_RECORDS':
      removeAll();
      createAll(data);
      break;

    case 'REMOVE_RECORD':
      remove(data.id);
      break;
  }

  localStorage.setItem('records', JSON.stringify(_records));
  RecordStore.emitChange();
});

module.exports = RecordStore;