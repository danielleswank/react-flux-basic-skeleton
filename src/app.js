var React = require('react');
var RecordShelfApp = require('./components/RecordShelfApp');
var APIUtils = require('./utils/APIUtils');

React.render(
  <RecordShelfApp />,
  document.getElementById('content')
);

APIUtils.getData();