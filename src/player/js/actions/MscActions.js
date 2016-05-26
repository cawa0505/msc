var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');

var MscActions = {

  connect: function () {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_CONNECT,
    });
  },

  togglePlayback: function () {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_TOGGLE_PLAYBACK,
    });
  },

  prevSong: function () {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_PREV,
    });
  },

  nextSong: function () {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_NEXT,
    });
  },

  seekPos: function (pos) {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_SEEK,
      data: pos,
    });
  },

  random: function () {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_RANDOM,
    });
  },

  repeat: function () {
    AppDispatcher.dispatch({
      actionType: Constants.MPD_REPEAT,
    });
  },

  updateCover: function () {
    AppDispatcher.dispatch({
      actionType: Constants.COVER_UPDATE,
    });
  },

  saveSettings: function (settings) {
    AppDispatcher.dispatch({
      actionType: Constants.SETTINGS_UPDATE,
      data: settings,
    });
  },

};

module.exports = MscActions;
