var React = require('react');

var Input = React.createClass({
  render: function() {
    return (
      <input
        className="input-box"
        onInput={this.props.onInput}
        defaultValue={this.props.color}
        placeholder="Enter a color or code" />
    );
  }
});

module.exports = Input;