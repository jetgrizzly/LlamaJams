var React = require('react');
var SongEntry = require('./SongEntry');

var Playlist = React.createClass({

  getInitialState: function() {
    return {
      backgroundColor: '#34344d'
    }
  },

  componentWillMount: function() {
    $('body').css('background-color', this.state.backgroundColor);
  },

  render: function() {
    return (
      <div className='music-page'>
        <div className='bigger-container'>
          <SongEntry {...this.props}/>
        </div>
      </div>
    );
  }
});

module.exports = Playlist;
