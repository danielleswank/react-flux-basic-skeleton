var _ = require('lodash');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var _shelves = {};

function update(data) {
  var id = data.id;
  _shelves[id] = assign({}, _shelves[id], data);
}

function updateAll(data) {
  for (var i = 0; i < data.length; i++) {
    var shelf = data[i];
    _shelves[shelf.id] = assign({}, _shelves[shelf.id], shelf);
  }
}

function createRecord(data) {
  var shelfId = "s" + _.size(_shelves);
  var shelf = _shelves[shelfId];

  shelf.recordIds.push(data.id);
}

function moveRecord(data) {
  var movedRecordId = data.recordId;

  var fromShelfId = data.fromShelfId;
  var toShelfId = data.toShelfId;

  var fromShelf = _shelves[fromShelfId];
  var toShelf = _shelves[toShelfId];

  var recordIndex = fromShelf.recordIds.indexOf(movedRecordId);

  fromShelf.recordIds.splice(recordIndex, 1);
  toShelf.recordIds.splice(data.index, 0, movedRecordId);
}

function removeRecord(data) {
  var shelfId = data.shelfId;
  var shelf = _shelves[shelfId];

  var recordId = data.id;
  var recordIndex = shelf.recordIds.indexOf(recordId);

  shelf.recordIds.splice(recordIndex, 1);
}

function removeAll() {
  var _shelves = {};
}

function createAll(data) {
  for (var i = 0; i < data.length; i++) {
    var shelf = data[i];
    _shelves[shelf.id] = shelf;
  }
}

var ShelfStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _shelves;
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
ShelfStore.dispatchToken = AppDispatcher.register(function(action) {
  var data = action.data;

  switch(action.actionType) {

    case 'CREATE_RECORD':
      createRecord(data);
      break;

    case 'REMOVE_RECORD':
      removeRecord(data);
      break;

    case 'MOVE_RECORD':
      moveRecord(data);
      break;

    case 'UPDATE_SHELF':
      update(data);
      break;

    case 'UPDATE_SHELVES':
      updateAll(data);
      break;

    case 'LOAD_SHELVES':
      removeAll();
      createAll(data);
      break;
  }

  localStorage.setItem('shelves', JSON.stringify(_shelves));
  ShelfStore.emitChange();
});

module.exports = ShelfStore;