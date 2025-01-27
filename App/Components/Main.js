var React = require('react');
var Auth = require('./auth/auth');
var Playlist = require('./playlist/playlist');
var helpers = require('../utils/helpers');

var Main = React.createClass({

  getInitialState: function() {

    return {
      showAuth: true,
      showPlaylist: false,
      playlistCode: '',
      check: false,
      hasToken: false,
      backgroundColor: '#d0c490'
    };
  },

  showInput: function(){
    // retrieve token from local storage
    var jwt = window.localStorage.getItem('token');
    console.log("inside showInput:", this.state.playlistCode);
    // if token exists, take user to playlist
    if (jwt) {
      // change trigger state
      this.setState({hasToken: true, showAuth: false, showPlaylist: true});
      // save context in variable
      var self = this;

      // authenticate token
      helpers.authHost(jwt)
        .then(function(data) {
          console.log('AUTH SUCCESSFUL ON RETURN:', data);
          self.setState({playlistCode: data.auth.playlistCode});
        })
        .catch(function(err) {
          console.log(err);
        })

    } else {
      console.log('NO TOKEN FOUND');
      var self = this;
      var playlistCode = this.state.playlistCode;
      helpers.checkCode()
      .then(function(snapshot) {
        for (var code in snapshot.val()) {
          if (code === playlistCode) {
          console.log('inside else statement of showinput:', snapshot.val());
          self.setState({check: false, showAuth: false, showPlaylist: true});
          } 
        }
      });
    }
  },

  updateCode: function(newCode) {
    console.log('before stateChange:', newCode);
    // change playlist code and re-render main component
    this.setState({playlistCode: newCode}, function() {
      this.showInput();
    });
    console.log('in updateCode:', this.state.playlistCode);
  },

  componentWillMount: function() {
    this.showInput();

    $('body').css('background-color', this.state.backgroundColor);
  },

  render: function() {
    return (
      <div className='home-page'>
        <div className='bigger-container'>
        <div className='align-container'>
        <div>
          {this.state.showAuth  ? <Auth updateCode={this.updateCode}/> : null}
        </div>

        <div>
          {this.state.showPlaylist ? <Playlist hasToken={this.state.hasToken} playlistCode={this.state.playlistCode}/> : null}
        </div>

        <div>
          {this.state.check ? <h1>Playlist Not Found</h1> : null}
        </div>        
        </div>
      </div>
      </div>
    )
  }
});

React.render(<Main />, document.getElementById('app'));
''