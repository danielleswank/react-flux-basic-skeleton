var _ = require('lodash');
var React = require('react/addons');
var RecordStore = require('../stores/RecordStore');

var Record = React.createClass({
  render: function() {
    var record = RecordStore.get(this.props.id);
    var metadata = _.map(record, function(data, key) {
      return (
        <li key={key}>
          {key}: {data}
        </li>
      );
    });

    return (
      <div
        className="record"
        onDragStart={this.props.onDragStart}
        onDrop={this.props.onDrop}
        draggable >

        <a onClick={this.props.onRemove} className="remove">x</a>

        <svg width="50" height="50">
          <circle cx="25" cy="25" r="25" fill="#9130C2" />
        </svg>

        <ul className="metadata">
          {metadata}
        </ul>

      </div>
    );
  }
});

module.exports = Record;