var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var MscActions    = require('../actions/MscActions');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var ipc           = require('ipc');

var CHANGE_EVENT = 'change';
var settings = {};
var lastSave = {};

ipc.on('save-settings', function (arg) {
  if (arg !== 'error') lastSave = settings = arg;
  else console.log('Error in saving settings');
});

function init() {
  settings = ipc.sendSync('get-settings');
}

var SettingsStore = assign({}, EventEmitter.prototype, {

  init: function () {
    init();
  },

  getSettings: function () {
    return settings;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    switch (payload.actionType) {
    case Constants.SETTINGS_UPDATE:
      ipc.send('save-settings', {
        host: payload.data.host,
        port: payload.data.port,
      });
    break;
  }
  }),

});

module.exports = SettingsStore;
