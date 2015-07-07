var _ = require('lodash');
var React = require('react');

var ColorScheme = React.createClass({
  render: function() {
    var colors = _.map(this.props.colors, function(color, i) {
      var hexColor = '#' + color;
      var divStyle = { backgroundColor: hexColor };
      return (
        <figure key={i} className="color">
          <div style={divStyle}></div>
          <figcaption>{hexColor}</figcaption>
        </figure>
      );
    });

    return (
      <div className="color-scheme" >
        {colors}
      </div>
    );
  }
});

module.exports = ColorScheme;