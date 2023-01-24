import { makeAutoObservable } from 'mobx';

class wsDataStore {
	ws: WebSocket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);

	constructor() {
		makeAutoObservable(this);
	}
}

export const wsStore = new wsDataStore();
