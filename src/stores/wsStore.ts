import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class wsDataStore {
	ws: WebSocket = new WebSocket('ws://localhost:5000/');

	constructor() {
		makeAutoObservable(this);
	}
}

export const wsStore = new wsDataStore();
