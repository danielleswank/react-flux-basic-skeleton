var React = require('react');
var Scheme = require('../../libs/color-scheme-min');
var ViewActions = require('../actions/ViewActions');

var Swatch = React.createClass({
  componentDidUpdate: function(prevProps, prevState) {
    var domNode = React.findDOMNode(this.refs.swatch);
    var color = getComputedStyle(domNode, null).backgroundColor;

    // prevents unwanted viewAction updates
    if (color == prevProps.color ||
      color == this.props.color ||
      domNode.style.backgroundColor == '') {
      return;
    }

    var hex = this.rgb2hex(color);
    var schema = new Scheme;
    var scheme = schema.from_hex(hex).colors();
    scheme.unshift(hex);
    ViewActions.addColorScheme(color, scheme);
  },

  render: function() {
    var text = this.props.text;
    var divStyle = { backgroundColor: text };
    return (
      <figure className="swatch color">
        <div style={divStyle} ref="swatch"></div>
      </figure>
    );
  },

  rgb2hex: function(rgb){
   rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
   return (rgb && rgb.length === 4) ?
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }
});

module.exports = Swatch;