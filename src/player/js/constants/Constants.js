var keyMirror = require('keymirror');

var Constants = keyMirror({
  MPD_CONNECT: null,
  MPD_TOGGLE_PLAYBACK: null,
  MPD_PREV: null,
  MPD_NEXT: null,
  MPD_SEEK: null,
  MPD_REPEAT: null,
  MPD_SINGLE: null,
  MPD_RANDOM: null,
  COVER_UPDATE: null,
  SETTINGS_UPDATE: null,
});

module.exports = Constants;
