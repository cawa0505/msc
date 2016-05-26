var React = require('react');

var SongInfo = React.createClass({

  _mouseEnter: function (event) {
    event.currentTarget.children.cover.classList.add('shown');
  },

  _mouseLeave: function (event) {
    event.currentTarget.children.cover.classList.remove('shown');
  },

  render: function () {
    var song = this.props.song;

    return (
       <div id="mousearea"
          onMouseEnter={this._mouseEnter}
          onMouseLeave={this._mouseLeave}>
				<div className="song-info" id="cover">
					<div className="artist">{ song.Artist.toUpperCase() }</div>
					<div className="title">{ song.Title }</div>
				</div>
			</div>
    );
  },

});

module.exports = SongInfo;
