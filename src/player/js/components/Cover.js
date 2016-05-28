var React      = require('react');
var CoverStore = require('../stores/CoverStore');
var MscActions = require('../actions/MscActions');
var $          = require('jquery');

function getCoverState() {
  var cover = CoverStore.getCover();
  return {
    cover: (cover === 'none' ? 'img/background.png' : cover),
  };
}

var Cover = React.createClass({

  _timeout: 0,

  _mouseEnter: function (event) {
    clearTimeout(this._timeout);
  },

  _mouseLeave: function (event) {
    var songInfo = $(event.currentTarget);

    songInfo.on('mouseenter', this._mouseEnter);

    this._timeout = setTimeout(function () {
      songInfo.off('mouseleave mouseenter');
      songInfo.removeClass('active');
    }, 5000);
  },

  _onClick: function (event) {
    var songInfo = $(event.currentTarget.children.songInfo);

    if (songInfo.hasClass('active')) {
      songInfo.removeClass('active');
      songInfo.off('mouseleave');
    } else {
      songInfo.addClass('active');
      songInfo.on('mouseleave', this._mouseLeave);
    }
  },

  getInitialState: function () {
    return getCoverState();
  },

  componentDidMount: function () {
    CoverStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    CoverStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var cover = this.state.cover;
    var data = this.props.overlay;
    var style = {
        backgroundImage: 'url(' + cover + ')',
      };
    var options = [
     {
      ID:       1,
      Class:    'icon ion-shuffle',
      Selected: data.Random,
      Func: function (event) {
        MscActions.random();
        event.stopPropagation();
      },
    },
     {
      ID:       2,
      Class:    'icon ion-loop',
      Selected: data.Repeat,
      Func: function (event) {
        MscActions.repeat();
        event.stopPropagation();
      },
    },
    ];
    var optElems = [];
    options.forEach(function (option) {
      var Class = option.Class + (option.Selected ? ' active' : '');
      optElems.push(
       <div className="option" key={option.ID}>
					<i className={Class} onClick={option.Func}></i>
				</div>
      );
    });

    return (
     <div className="cover" style={style}
          onClick={this._onClick}>
				<div className="song-info" id="songInfo">
					<div className="artist">{ (data.Artist) ? data.Artist.toUpperCase() : '' }</div>
					<div className="title">{ data.Title }</div>
					<div className="playback-options">
						{optElems}
					</div>
				</div>
			</div>
    );
  },

  _onChange: function () {
    var self = this;
    var cover = getCoverState();
    var img = new Image();
    img.onload = function () {
      self.setState(cover);
    };

    img.src = cover.cover;
  },

});

module.exports = Cover;
