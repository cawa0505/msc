var React      = require('react');
var MscActions = require('../actions/MscActions');

var Controls = React.createClass({

  togglePlayback: function () {
    MscActions.togglePlayback();
  },

  prevSong: function () {
    MscActions.prevSong();
  },

  nextSong: function () {
    MscActions.nextSong();
  },

  render: function () {
    var state = this.props.state;
    var btnClass = 'icon control' + (state === 'play' ? ' ion-ios-pause' : ' ion-ios-play');
    return (
     <div className="controls">
				<i className="icon ion-ios-skipbackward control"
      onClick={this.prevSong}
      id="prevBtn"></i>
				<i className={btnClass}
      onClick={this.togglePlayback}
      id="playBtn"></i>
				<i className="icon ion-ios-skipforward control"
      onClick={this.nextSong}
      id="nextBtn"></i>
			</div>
    );
  },

});

module.exports = Controls;
