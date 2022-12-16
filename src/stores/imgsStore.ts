import { makeAutoObservable } from 'mobx';

class imgsDataStore {
	activeImgs: Array<string> = [];

	constructor() {
		makeAutoObservable(this);
	}

	resetActiveImgs() {
		this.activeImgs = [];
	}

	addActiveImg(img: string) {
		this.activeImgs.push(img);
	}
}

export const imgsStore = new imgsDataStore();
