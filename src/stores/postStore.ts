import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class postDataStore {
	activePostId = 0;

	socArray: Array<Socnet> = [];
	themeArray: Array<Theme> = [];

	activeSocArray: Array<Number> = [];
	activeThemeArray: Array<Number> = [];

	textPost = this.resetTextPost();

	postsArray: Array<Posts> = [];

	updatePost = false;

	resetTextPost() {
		return '';
	}

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'postDataStore',
			properties: ['socArray', 'themeArray'],
			storage: sessionStorage,
		});
	}

	resetActiveArray() {
		this.activeSocArray = [];
		this.activeThemeArray = [];
		this.textPost = '';
	}

	changeActivePostId(id: number) {
		this.activePostId = id;
	}

	addSocArray(socArray: Array<Socnet>) {
		this.socArray = socArray;
	}

	addThemeArray(themeArray: Array<Theme>) {
		this.themeArray = themeArray;
	}

	addActiveSocnet(socnet: number) {
		if (this.activeSocArray.includes(socnet)) {
			this.activeSocArray.splice(this.activeSocArray.indexOf(socnet), 1);
		} else this.activeSocArray.push(socnet);
	}

	addActiveTheme(theme: number) {
		if (this.activeThemeArray.includes(theme)) {
			this.activeThemeArray.splice(this.activeThemeArray.indexOf(theme), 1);
		} else this.activeThemeArray.push(theme);
	}

	changeTextPost(text: string) {
		this.textPost = text;
	}

	changePostsArray(posts: Array<Posts>) {
		this.postsArray = posts;
	}

	getSocName(id: number) {
		for (let i = 0; i < this.socArray.length; i++) {
			if (this.socArray[i].id === id) return this.socArray[i].socnet;
		}
	}

	getThemeName(id: number) {
		for (let i = 0; i < this.themeArray.length; i++) {
			if (this.themeArray[i].id === id) return this.themeArray[i];
		}
	}

	changeUpdatePost() {
		this.updatePost = !this.updatePost;
	}
}

export const postStore = new postDataStore();
