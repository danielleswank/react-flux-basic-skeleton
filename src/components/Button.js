var React = require('react/addons');

var Button = React.createClass({
  render: function() {
    return (
      <button className="button" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
});

module.exports = Button;