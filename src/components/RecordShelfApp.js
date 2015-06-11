var React = require('react');
var _ = require('lodash');

var Shelf = require('./Shelf');
var RecordForm = require('./RecordForm');
var Menu = require('./Menu');
var ShelfStore = require('../stores/ShelfStore');
var RecordStore = require('../stores/RecordStore');

var RecordShelfApp = React.createClass({
  getInitialState: function() {
    return {
      shelves: ShelfStore.getAll(),
      records: RecordStore.getAll()
    };
  },

  onChange: function() {
    this.setState(this.getInitialState());
  },

  componentDidMount: function() {
    ShelfStore.addChangeListener(this.onChange);
    RecordStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ShelfStore.removeChangeListener(this.onChange);
    RecordStore.removeChangeListener(this.onChange);
  },

  render: function() {
    var shelves = _.map(this.state.shelves, function(shelf) {
      return (
        <Shelf
          key={shelf.id}
          id={shelf.id}
          title={shelf.title}
          recordIds={shelf.recordIds} />
      );
    });
    return (
      <div className="record-shelf-app">
        <h1>Record Shelf</h1>
        <Menu
          shelves={this.state.shelves}
          records={this.state.records} />
        <RecordForm />
        <div className="shelves">
          {shelves}
        </div>
      </div>
    );
  }
});

module.exports = RecordShelfApp;





















