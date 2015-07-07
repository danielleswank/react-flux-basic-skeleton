var React = require('react');
var ColorApp = require('./components/ColorApp');
var APIUtils = require('./utils/APIUtils');

React.render(
  <ColorApp />,
  document.getElementById('content')
);

APIUtils.getHistory();