var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _schemes = [];
var _current = '';

function addColorScheme(data) {
  _current = data.color;
  _schemes.unshift(data.scheme);

  if (_schemes.length > 5) {
    _schemes.pop();
  }

  localStorage.setItem('schemes', JSON.stringify(_schemes));
  localStorage.setItem('current', _current);
}

function loadColorSchemes(data) {
  _current = data.current;
  _schemes = data.schemes;
}

var ColorStore = assign({}, EventEmitter.prototype, {

  getSchemes: function() {
    return _schemes;
  },

  getCurrent: function() {
    return _current;
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
ColorStore.dispatchToken = AppDispatcher.register(function(action) {
  var data = action.data;

  switch(action.actionType) {
    case 'ADD_COLORSCHEME':
      addColorScheme(data);
      break;

    case 'LOAD_COLORSCHEMES':
      loadColorSchemes(data);
      break;
  }

  ColorStore.emitChange();
});

module.exports = ColorStore;