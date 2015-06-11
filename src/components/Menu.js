var _ = require('lodash');
var React = require('react/addons');
var ViewActions = require('../actions/ViewActions');

var Button = require('./Button');

var Menu = React.createClass({
  render: function() {
    return (
      <menu className="menu">
        <h2>Menu</h2>
        <Button
          onClick={this.groupByGenre}
          text="Sort By Genre" />
        <Button
          onClick={this.sortByTitle}
          text="Sort By Title" />
        <Button
          onClick={this.sortByArtist}
          text="Sort By Artist" />
        <Button
          onClick={this.reset}
          text="Reset Defaults" />
      </menu>
    );
  },

  sortByTitle: function(e) {
    e.preventDefault;

    var records = _.sortBy(this.props.records, 'title');
    var ids = _.pluck(records, 'id');
    var shelfSize = Math.ceil(
      ids.length / _.size(this.props.shelves)
    );
    var recordIds = _.chunk(ids, shelfSize);

    this.updateShelves(recordIds);
  },

  sortByArtist: function(e) {
    e.preventDefault;

    var records = _.sortBy(this.props.records, 'artist');
    var ids = _.pluck(records, 'id');
    var shelfSize = Math.ceil(
      ids.length / _.size(this.props.shelves)
    );
    var recordIds = _.chunk(ids, shelfSize);

    this.updateShelves(recordIds);
  },

  groupByGenre: function(e) {
    e.preventDefault;

    var id, recordIds = [];
    var records = _.groupBy(this.props.records, 'genre');
    records = _.toArray(records);

    for (var i = 0; i < records.length; i++) {
      recordIds.push(_.pluck(records[i], 'id'));
    };

    this.updateShelves(recordIds);
  },

  updateShelves: function(recordIds) {
    var id;
    var shelves = _.map(this.props.shelves, function(shelf, i) {
      id = recordIds.shift();
      shelf.recordIds = id;
      return shelf;
    });

    ViewActions.updateShelves(shelves);
  },

  reset: function(e) {
    e.preventDefault;
    ViewActions.reset();
  }
});

module.exports = Menu;