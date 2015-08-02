/// <reference path="../../../shared/ts/typings/interfaces.d.ts"/>

interface IMpdStoreState {
	playlist: IListItem[];
	artists: string[];
	albums: IAlbums;
	songs: ISongs;
}

interface ITab {
	id: number;
	icon: string;
	title: string;
}

interface ITabStoreState {
	activeTab: number;
	tabs: ITab[];
}

interface ISongData {
	id: number;
}

interface IListItem {
	file: string;
	artist: string;
	album: string;
	genre: string;
	title: string;
	time: number;
	id: number;
}