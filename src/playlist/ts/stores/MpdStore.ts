/// <reference path="../typings/playlist.d.ts" />

import * as alt from '../alt';
import * as ipc from 'ipc';
import MpdActions = require('../actions/MpdActions');
import AbstractStoreModel = require('./AbstractStoreModel');

class MpdStore extends AbstractStoreModel<IMpdStoreState> implements AltJS.StoreModel<IMpdStoreState> {
	playlist: IListItem[] = [];
	artists: string[] = [];
	albums: IAlbums = {
		artist: '',
		albums: []
	};
	songs: ISongs = {
		artist: '',
		album: '',
		songs: []
	};
	constructor() {
		super();
		this.bindActions(MpdActions);
	}

	onUpdatePlaylist(playlist: IListItem[]) {
		this.playlist = playlist;
	}

	onGetArtists(artists: string[]) {
		this.artists = artists;
	}

	onGetAlbums(albums: IAlbums) {
		this.albums = albums;
	}

	onGetSongs(songs: ISongs) {
		this.songs = songs;
	}
}

export = alt.createStore<IMpdStoreState>(MpdStore, 'MpdStore');