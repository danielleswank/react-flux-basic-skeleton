var React = require('react');
var _ = require('lodash');

var ColorStore = require('../stores/ColorStore');
var ColorScheme = require('./ColorScheme');
var Swatch = require('./Swatch');
var Input = require('./Input');

var ColorApp = React.createClass({
  getInitialState: function() {
    return {
      color: ColorStore.getCurrent(),
      schemes: ColorStore.getSchemes()
    };
  },

  onChange: function() {
    this.setState(this.getInitialState());
  },

  componentDidMount: function() {
    ColorStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ColorStore.removeChangeListener(this.onChange);
  },

  onInput: function(e) {
    e.preventDefault();
    var text = e.target.value;
    if (text != '') {
      this.setState({ text: text.trim() });
    }
  },

  render: function() {
    var subtext = (this.state.schemes.length > 0) ? 'Recent Color Pallets': '';
    var colorSchemes = _.map(this.state.schemes, function(colors, i) {
      return (
        <ColorScheme key={i} colors={colors} />
      );
    });

    return (
      <div className="color-app">
        <header>
          <h1>Explore the Rainbow</h1>
          <Input text={this.state.text} onInput={this.onInput} />
          <Swatch color={this.state.color} text={this.state.text} />
        </header>

        <h2>{subtext}</h2>
        {colorSchemes}
      </div>
    );
  }
});

module.exports = ColorApp;