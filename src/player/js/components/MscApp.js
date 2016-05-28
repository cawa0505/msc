var Controls    = require('./Controls');
var Cover       = require('./Cover');
var SongInfo    = require('./SongInfo');
var Menu        = require('./Menu');
var ProgressBar = require('./ProgressBar');
var Settings    = require('./Settings');
var React       = require('react');
var MpdStore    = require('../stores/MpdStore');

function getMscState() {
  return {
    status: MpdStore.getStatus(),
  };
}

var MscApp = React.createClass({

  getInitialState: function () {
    return getMscState();
  },

  componentDidMount: function () {
    MpdStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MpdStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var state = this.state.status.State;
    var overlay = {
      Artist: this.state.status.Artist,
      Title:  this.state.status.Title,
      Repeat: this.state.status.Repeat,
      Random: this.state.status.Random,
    };
    var progress = {
      Time: this.state.status.Elapsed,
      Duration: this.state.status.Duration,
    };

    return (
      <div className="flex-container">
				<Cover overlay={overlay} />
				<ProgressBar progress={progress} />
				<Controls state={state} />
				<Menu />
				<Settings />
			</div>
    );
  },

  _onChange: function () {
    this.setState(getMscState());
  },

});

module.exports = MscApp;
