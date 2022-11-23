import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class tokenDataStore {
	token: string = this.resetToken();

	resetToken() {
		return '';
	}

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: 'tokenDataStore',
			properties: ['token'],
			storage: sessionStorage,
		});
	}

	addtoken(token: string) {
		this.token = token;
	}
}

export const tokenStore = new tokenDataStore();
