var React = require('react/addons');
var ViewActions = require('../actions/ViewActions');

var RecordForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      title: '',
      asin: '',
      artist: '',
      genre: ''
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var record = {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      title: this.state.title.trim(),
      asin: this.state.asin.trim(),
      artist: this.state.artist.trim(),
      genre: this.state.genre.trim()
    };

    console.log(record);
    ViewActions.createRecord(record);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} method="post" className="form">
        <h2>Add New Record</h2>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" valueLink={this.linkState('title')} className="input" />
        </div>

        <div className="row">
          <label htmlFor="artist">Artist</label>
          <input type="artist" id="artist" valueLink={this.linkState('artist')} className="input" />
        </div>

        <div className="row">
          <label htmlFor="genre">Genre</label>
          <input type="genre" id="genre" valueLink={this.linkState('genre')} className="input" />
        </div>

        <div className="row">
          <label htmlFor="asin">Genre</label>
          <input type="asin" id="asin" valueLink={this.linkState('asin')} className="input" />
        </div>
        <div className="row">
          <input type="submit" value="Signup" className="button" />
        </div>
      </form>
    );
  }
});

module.exports = RecordForm;