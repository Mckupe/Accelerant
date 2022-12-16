import { makeAutoObservable } from 'mobx';

class filterDataStore {
	activeTheme: Theme = this.resetActiveTheme();

	constructor() {
		makeAutoObservable(this);
	}

	resetActiveTheme() {
		return { id: 0, theme: 'Все', color: '' };
	}

	changeActiveTheme(theme: Theme) {
		this.activeTheme = theme;
	}
}

export const filterStore = new filterDataStore();
