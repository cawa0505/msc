var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var MscActions    = require('../actions/MscActions');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var SettingsStore = require('./SettingsStore');
// var ipc           = require('ipc');
const { ipcRenderer } = require('electron');

var CHANGE_EVENT = 'change';

var status = {
  Volume:  100,
  State:   'stop',
  Artist:  '',
  Album:   '',
  Title:   '',
  Elapsed: '',
  Duration: '',
  Random:  0,
  Repeat:  0
};

ipcRenderer.on('connection-success', function () {
  // TODO: turn off spinner
});

ipcRenderer.on('connection-fail', function () {
  // TODO: turn on spinner
});

ipcRenderer.on('status-update', (event, data) => {
  var oldAlbum = status.Album;
  status = data;
  MpdStore.emitChange();

  if (status.Album !== oldAlbum) MscActions.updateCover();
});

var MpdStore = assign({}, EventEmitter.prototype, {

  connect: function () {
    ipcRenderer.send('connect');
  },

  getStatus: function () {
    return status;
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
    case Constants.MPD_CONNECT:
      ipcRenderer.send('connect');
    break;
    case Constants.MPD_TOGGLE_PLAYBACK:
      ipcRenderer.send('toggle-playback');
    break;
    case Constants.MPD_PREV:
      ipcRenderer.send('prev-song');
    break;
    case Constants.MPD_NEXT:
      ipcRenderer.send('next-song');
    break;
    case Constants.MPD_SEEK:
      var percent = payload.data.percent;
      if (percent <= 0.015) percent = 0;
      ipcRenderer.send('seek', percent * status.Duration);
    break;
    case Constants.MPD_REPEAT:
      ipcRenderer.send('repeat', (status.Repeat ? '0' : '1'));
    break;
    case Constants.MPD_RANDOM:
      ipcRenderer.send('random', (status.Random ? '0' : '1'));
    break;
  }
  }),
});

module.exports = MpdStore;
