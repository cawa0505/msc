var React = require('react');
var $ = require('jquery');
var SettingsStore = require('../stores/SettingsStore');
var MscActions = require('../actions/MscActions');

var dirty = false;

function getSettingsState() {
  return SettingsStore.getSettings();
}

var Settings = React.createClass({

  getInitialState: function () {
    return getSettingsState();
  },

  componentDidMount: function () {
    SettingsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SettingsStore.removeChangeListener(this._onChange);
  },

  handleChange: function (event) {
    var currentState = this.state;
    var value = event.target.value;
    switch (event.target.id) {
    case 'host':
      currentState.host = value;
      break;
    case 'port':
      currentState.port = value;
      break;
  }
    dirty = true;
    this.setState(currentState);
  },

  _onClick: function (event) {
    $('.settings')
      .removeClass('active');

    if (dirty) {
      MscActions.saveSettings({
        host: this.state.host,
        port: this.state.port,
      });
      setTimeout(MscActions.connect, 200);
      dirty = false;
    }
  },

  render: function () {
    return (
      <div className="settings">
        <p> HOST </p>
        <input type="text" id="host" value={this.state.host} onChange={this.handleChange} />
        <p> PORT </p>
        <input type="text" id="port" value={this.state.port} onChange={this.handleChange} />
        <div className="save-btn" onClick={this._onClick}> SAVE </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getSettingsState());
  },

});

module.exports = Settings;
