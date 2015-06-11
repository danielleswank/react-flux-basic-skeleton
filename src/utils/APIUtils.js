var _ = require('lodash');
var $ = require('zepto-browserify').$;
var Promise = require('es6-promise').Promise;

var ServerActions = require('../actions/ServerActions');

var APIUtils = {
  get: function(url) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type:'GET',
        url: url,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, type) {
          reject(xhr);
        }
      });
    });
  },

  getData: function() {
    var shelves = JSON.parse(localStorage.getItem('shelves'));
    var records = JSON.parse(localStorage.getItem('records'));

    if (shelves && records) {
      ServerActions.loadShelves(_.toArray(shelves));
      ServerActions.loadRecords(_.toArray(records));
      return;
    }

    APIUtils.getDefaultData();
  },

  getDefaultData: function () {
    APIUtils.get('/js/record-shelf.json').then(function(data) {
      var recordshelf = data.recordshelf,
        shelves = [],
        records = [],
        shelf = {},
        record = {};

      for (var i = 0; i < recordshelf.length; i++) {
        rs = recordshelf[i];
        shelf = {
          id: rs.id,
          title: rs.title,
          recordIds: []
        };

        for (var j = 0; j < rs.records.length; j++) {
          record = rs.records[j];
          record.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
          records.push(record);

          shelf.recordIds.push(record.id);
        }

        shelves.push(shelf);
      }

      ServerActions.loadShelves(shelves);
      ServerActions.loadRecords(records);
    }, function(err) {
      console.error(xhr, type);
    });
  }
};

module.exports = APIUtils;
