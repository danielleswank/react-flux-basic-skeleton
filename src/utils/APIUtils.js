var ViewActions = require('../actions/ViewActions');
var _ = require('lodash');

var APIUtils = {
  getHistory: function() {
    var schemes = JSON.parse(localStorage.getItem('schemes'));
    var current = localStorage.getItem('current');
    if (current && schemes) {
      ViewActions.loadHistory(current, _.toArray(schemes));
    }
  }
};

module.exports = APIUtils;
