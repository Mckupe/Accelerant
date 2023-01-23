import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class postDataStore {
	activePostId = 0;
	activePostIsPublished = false;
	socArray: Array<Socnet> = [];
	themeArray: Array<Theme> = [];

	activeSocArray: Array<Number> = [];
	activeThemeArray: Array<Number> = [];

	textPost = this.resetTextPost();

	postsArray: Array<Posts> = [];

	updatePost = false;
	morePosts = true;

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

	changeActivePostPublished(published: boolean) {
		this.activePostIsPublished = published;
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

	changeMorePosts() {
		this.morePosts = !this.morePosts;
	}

	getDayPosts(day: string, theme: Theme) {
		const dayPosts: Array<Posts> = [];
		this.postsArray.map(post => {
			if (
				dayjs(Number(post.post.time)).locale('ru').format('D MMMM dddd') === day
			)
				dayPosts.push(post);
		});
		if (theme.theme === 'Все') return this.sortPosts(dayPosts);
		else {
			return this.filterPosts(dayPosts, theme);
		}
	}

	filterPosts(posts: Array<Posts>, theme: Theme) {
		return posts.filter(post => {
			return post.post.themeId.includes(theme.id);
		});
	}

	sortPosts(posts: Array<Posts>) {
		return posts.sort((x, y) => {
			return x.post.time === y.post.time
				? 0
				: x.post.time > y.post.time
				? 1
				: -1;
		});
	}

	checkSocNetTg(activeSocNet: number[]) {
		let res = false;
		activeSocNet.forEach(socNet => {
			this.socArray.forEach(soc => {
				if (soc.id === socNet && soc.socnet === 'telega') res = true;
			});
		});
		return res;
	}

	checkSocNetVk(activeSocNet: number[]) {
		let res = false;
		activeSocNet.forEach(socNet => {
			this.socArray.forEach(soc => {
				if (soc.id === socNet && soc.socnet === 'vk') res = true;
			});
		});
		return res;
	}
}

export const postStore = new postDataStore();