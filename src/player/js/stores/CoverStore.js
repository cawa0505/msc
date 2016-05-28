var covers        = require('cover-art');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var MpdStore      = require('./MpdStore');

var CHANGE_EVENT = 'change';

var cover = 'none';

function fetchCoverArt(artist, album, fn) {
  if (artist === undefined || album === undefined) {
    fn('error');
    return;
  }

  covers(artist, album, 'extralarge', fn);
}

var CoverStore = assign({}, EventEmitter.prototype, {

  getCover: function () {
    return cover;
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
    case Constants.COVER_UPDATE:
      var mpdStatus = MpdStore.getStatus();
      console.log(mpdStatus.Album, mpdStatus.Artist);
      fetchCoverArt(mpdStatus.Artist, mpdStatus.Album,
       function (err, res) {
        if (!err) {
          cover = (res !== 'No image was found' ? res : 'none');
        } else {
          cover = 'none';
        }

        CoverStore.emitChange();
      }
      );
    break;
  }
  }),
});

module.exports = CoverStore;
