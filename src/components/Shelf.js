var _ = require('lodash');
var React = require('react/addons');
var ViewActions = require('../actions/ViewActions');

var Record = require('./Record');

var Shelf = React.createClass({
  getInitialState: function() {
    return {
      over: false
    };
  },

  onDragStart: function(id, e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("recordId", id);
    e.dataTransfer.setData("fromShelfId", this.props.id);
  },

  onDrop: function(index, e) {
    e.stopPropagation();

    ViewActions.moveRecord(
      e.dataTransfer.getData("recordId"),
      e.dataTransfer.getData("fromShelfId"),
      this.props.id,
      index
    );
  },

  onDragOver: function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  },

  onDragEnd: function(e) {
    this.setState({
      over: false
    });
  },

  onDragEnter: function(e) {
    this.setState({
      over: true
    });
  },

  onDragLeave: function(e) {
    this.setState({
      over: false
    });
  },

  onRemove: function(id, e) {
    e.preventDefault;
    ViewActions.removeRecord(id, this.props.id);
  },

  render: function() {
    var records = _.map(this.props.recordIds, function(id, i) {
      return (
        <Record
          key={i}
          id={id}
          onDragStart={this.onDragStart.bind(this, id)}
          onDrop={this.onDrop.bind(this, i)}
          onRemove={this.onRemove.bind(this, id)}/>
      );
    }, this);

    return (
      <div className="shelf"
        onDragOver={this.onDragOver}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop.bind(this, this.props.recordIds.length)}>
        <h2>{this.props.title}</h2>
        {records}
      </div>
    );
  }
});

module.exports = Shelf;